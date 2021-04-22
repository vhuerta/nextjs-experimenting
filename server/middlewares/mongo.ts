import { modelAndName } from "server/models";
import { getConnection } from "server/utils/mongo";

/**
 * Connects to mongo and adds the connection reference to
 * the request object
 * @param handler
 */
export const mongo = (handler) => async (req, res) => {
  const connection = await getConnection();
  req.mongo = connection;
  req.models = req.models || {};

  modelAndName.forEach(([name, model]) => {
    connection.model(name, model);
    req.models[name] = connection.model(name);
  });

  return handler(req, res);
};
