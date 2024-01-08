import proxy from "http2-proxy";
import { Plugin, Connect } from "vite";

const error = (message: string): never => {
  throw new Error(message);
};

const deriveProtocol = (url: URL): "https" | "http" => {
  if (!/^https?:$/.test(url.protocol)) {
    error(`Invalid protocol: ${url.href}`);
  }
  return url.protocol.slice(0, -1) as "https" | "http";
};

const derivePort = (url: URL, protocol: ReturnType<typeof deriveProtocol>): number => {
  let port;
  if (url.port === "") {
    port = { https: 443, http: 80 }[protocol];
  } else if (/^\d+$/.test(url.port)) {
    port = Number(url.port);
  } else {
    error(`Invalid port: ${url.href}`);
  }
  return port;
};

export default (options: { [regexp: string]: string }): Plugin => {
  const configure = ({ middlewares }: { middlewares: Connect.Server }) => {
    for (const [regexp, target] of Object.entries(options)) {
      const re = new RegExp(regexp);
      const tu = new URL(target);

      if (!tu.pathname.endsWith("/")) {
        tu.pathname += "/";
      }

      const protocol = deriveProtocol(tu);
      const port = derivePort(tu, protocol);

      middlewares.use((req, res, next) => {
        if (req.originalUrl && re.test(req.originalUrl)) {
          const url = req.originalUrl.replace(/^\/+/, "");
          const { pathname, search } = new URL(url, tu);
          proxy.web(
            req,
            res,
            {
              protocol,
              port,
              hostname: tu.hostname,
              path: pathname + search,
              ["rejectUnauthorized" as never]: false,
            },
            (err) => {
              err && next(err);
            }
          );
        } else {
          next();
        }
      });
    }
  };

  return {
    name: "http2-proxy",
    configureServer: configure,
    configurePreviewServer: configure,
  };
};
