"use server";
import { cookies } from 'next/headers'


export async function cookieSetter(data: string) {
  const halfAnHour = 60 * 60 * 1000 / 2;
  cookies().set('companyName', data, { expires: Date.now() + halfAnHour })
}

export async function cookieGetter(): Promise<string | undefined> {
  try {
    const cookieStore = cookies();
    const symbol = cookieStore.get('companyName');
    if (typeof symbol?.value === 'string') {
      return symbol.value;
    }
    return undefined;
  } catch (error) {
    console.error("Error retrieving cookie:", error);
    return undefined;
  }
}

