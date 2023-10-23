import httpProxy from 'http-proxy';
import { Request, Response } from 'express';

// Define the serverProxy function
export const serverProxy = (req: Request, res: Response) => {
  // Create a new instance of httpProxy
  const proxy = httpProxy.createProxyServer({});

  // Proxy the request to the target server
  proxy.web(req, res, {
    target: 'http://localhost:8080',
  });
};
