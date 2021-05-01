interface Response {
  token: String;
  user: {
    name: String;
    email: String;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'sdkjfhlabvsskfbsckhcfbgkah',
        user: {
          name: 'Pablo Almeida',
          email: 'pabloandroidcc0@gmail.com',
        },
      });
    }, 2000);
  });
}
