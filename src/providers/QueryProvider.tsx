import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
