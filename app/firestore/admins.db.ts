import { db } from "~/utils/db.server";

export const login = async (email: string, password: string) => {
  const queryResponse = await db.collection("admins").where("email", "==", email).where("password", "==", password).get();
  
  let adminRecords:any = []; 
  queryResponse.forEach((doc) => {
    adminRecords.push({ id: doc.id, ...doc.data() });
  });
  
  console.log({ email, password, adminRecords });
  
  if (adminRecords.length === 1) {
    return adminRecords[0];
  }

  return null;
}
