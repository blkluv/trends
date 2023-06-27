import toast from "react-hot-toast";

export const executeInTryCatchBlock = async(tryBlock: () => any) => {
  try{
    await tryBlock();
  } catch (err: any) {
    toast.error(err.message);
}
}