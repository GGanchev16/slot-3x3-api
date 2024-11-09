import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

type TErrorResponse = {
  status: number;
  name: string;
  message: string;
};

export const getErrorResponse: (error: any) => TErrorResponse = (error) => {
  const getErrorStatus = () => {
    switch (true) {
      case "status" in error:
        return error.status;
      case error instanceof yup.ValidationError:
        return 400;
      default:
        return 500;
    }
  };

  const getErrorName = () => {
    switch (true) {
      case "name" in error:
        return error.name;
      case error instanceof yup.ValidationError:
        return "VALIDATION ERROR";
      default:
        return "INTERNAL SERVER ERROR";
    }
  };

  const getErrorMessage = () => {
    switch (true) {
      case "message" in error:
        return error.message;
      default:
        return "There was an internal server error, please try again later.";
    }
  };

  return {
    status: getErrorStatus(),
    name: getErrorName(),
    message: getErrorMessage(),
  };
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //all errors pass through here
  const { name, message, status } = getErrorResponse(err);
  console.log(err);

  const errorObj = {
    error: {
      status,
      name,
      message,
    },
  };

  res.status(status).send(errorObj);
};
