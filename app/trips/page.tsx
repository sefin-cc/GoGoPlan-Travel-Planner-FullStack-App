import { auth } from "@/auth";


export default async function TripsPage() {
    const session = await auth();
    if (!session) { 
        return (
        <div className="flex justify-center items-center h-screen text-gray-700 text-xl"> 
            {" "}
            Please Sign In 
        </div>
        );
    }

    return (
        <div className="space-y-6 container nx-auto">

        </div>
    );
}