import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import MainLayout from 'src/layout/main';

const GaragePage = lazy(() => import('src/pages/garage'))
const WinnersPage = lazy(() => import('src/pages/winners'))

export default function Router() {

    const Garage = (
        <MainLayout>
            <GaragePage />
        </MainLayout>
    )

    return useRoutes([
        {
            path: '/',
            element: Garage,
        },
        {
            path: '/winners',
            element: (
                <MainLayout>
                    <WinnersPage />
                </MainLayout>
            ),
        },

        // No match 
        { path: '*', element: Garage },
    ]);
}
