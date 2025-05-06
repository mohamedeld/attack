import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className='flex flex-col min-h-screen justify-center items-center'>
        <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle>Attack Auth</CardTitle>
        <CardDescription>Welcome to Attack app</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      </Card>

        </div>
    );
  }