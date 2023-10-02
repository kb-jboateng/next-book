import { JWT, getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { cache } from 'react';

export const getUser = cache(async (req: NextRequest): Promise<JWT> => {
    const session = await getToken({ req });

    if (!session) {
        throw new Error("Unauthorized");
    }

    return session;
});

// work around for BIGINT not being JSON serializable
export const serializeData = cache((data: any) => {
    return JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
});