// CreatePageServer.tsx
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CreatePageClient from "./clientpage";

const CreatePageServer = () => {
    return (
        <div className="bg-slate-500 max-w-5xl mx-auto flex md:items-center md:justify-center p-6 h-full">
            <div>
                <h1 className="text-2xl">Name your course</h1>
                <p className="text-sm text-slate-200">
                    You can change the name later, don&apos;t worry
                </p>
                
                {/* Load the client component */}
                <Suspense fallback={<div>Loading...</div>}>
                    <CreatePageClient />
                </Suspense>
            </div>
        </div>
    );
};

export default CreatePageServer;
