import { useCallback, useState } from "react";
import axios from "axios";
import { LoanRequestType } from "../utility/types";
const BASE_URL = "https://655e2d6f9f1e1093c59aa79d.mockapi.io";

const instance = axios.create({
  baseURL: BASE_URL,
});

const useLoanHandler = () => {
  const [loading, setLoading] = useState(false);

  const requestLoan = useCallback(async (payload: Partial<LoanRequestType>) => {
    setLoading(true);
    let isSuccess = true;
    try {
      return await instance.post("/api/v1/loan", payload);
    } catch (ex) {
      isSuccess = false;
    } finally {
      setLoading(false);
    }
    return isSuccess;
  }, []);

  const fetchLoans = useCallback(async () => {
    setLoading(true);
    let result: LoanRequestType[] = [];
    try {
      const { data } = await instance.get("/api/v1/loan");
      result = data;
    } catch (ex) {
      result = [];
    } finally {
      setLoading(false);
    }
    return result;
  }, []);

  const madePartialPayment =  useCallback(async (payload: LoanRequestType) => {
    setLoading(true);
    let isSuccess = true;
    try {
      return await instance.put(`/api/v1/loan/${payload.id}`, payload);
    } catch (ex) {
      isSuccess = false;
    } finally {
      setLoading(false);
    }
    return isSuccess;
  }, []);

  const madeFullPayment =  useCallback(async (payload: LoanRequestType) => {
    setLoading(true);
    let isSuccess = true;
    try {
      return await instance.put(`/api/v1/loan/${payload.id}`, payload);
    } catch (ex) {
      isSuccess = false;
    } finally {
      setLoading(false);
    }
    return isSuccess;
  }, []);

  return {
    requestLoan,
    loading,
    fetchLoans,
    madePartialPayment,
    madeFullPayment
  };
};

export default useLoanHandler;
