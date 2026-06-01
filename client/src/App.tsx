import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { login } from '@/api/auth';

const App = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: login,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <p className="text-muted-foreground text-lg">
        Press the button below to authenticate with IsPro and start working.
      </p>

      <Button onClick={() => mutate()} disabled={isPending || isSuccess}>
        {isPending ? 'Connecting...' : isSuccess ? 'Connected' : 'Login to IsPro'}
      </Button>

      {isError && (
        <p className="text-destructive text-sm">
          Login failed. Check that the backend is running.
        </p>
      )}
    </div>
  );
};

export default App;
