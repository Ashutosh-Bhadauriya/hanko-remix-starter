import { type LoaderFunction, json, redirect } from '@remix-run/node';
import { validateJwtAndFetchUserId } from '../services/auth.server';

export let loader: LoaderFunction = async ({ request }) => {
    const userID = await validateJwtAndFetchUserId(request);

    if (!userID) {
        return redirect('/login');
    }

    return json({ userID });
};

export default function Protected() {
    return (
        <div>
            <h1>Protected</h1>
        </div>
    );
}