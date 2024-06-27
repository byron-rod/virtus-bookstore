var myHeaders = new Headers();
myHeaders.append("X-PUBLIC-KEY", import.meta.env.VITE_RECURRENTE_PUBLIC_KEY);
myHeaders.append("X-SECRET-KEY", import.meta.env.VITE_RECURRENTE_PRIVATE_KEY);
myHeaders.append("Content-Type", "application/json");
