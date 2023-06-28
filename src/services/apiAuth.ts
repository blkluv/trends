import supabase from "./supabase";

interface Auth{
  email: string;
  password: string;
}
export async function login({ email, password}: Auth){
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if(error){
  console.log(error.message);
  throw new Error(error.message);
}

console.log(data);
return data;
}


export async function signUp({email, password}: Auth){
  
const { data, error } = await supabase.auth.signUp({
  email,
  password
});

if(error){
  console.log(error.message);
  throw new Error(error.message);
}

return data;
}