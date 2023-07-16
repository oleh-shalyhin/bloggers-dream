import { EntityId, PreloadedState } from '@reduxjs/toolkit';
import { RenderOptions, render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { commentsResponseMock, postsResponseMock, usersMock } from '../mocks/mocks';
import { AppStore, RootState, setupStore } from '../store/store';
import { RequestStatus } from '../types/types';

export interface EntityWithId {
  id: EntityId;
}

export interface RoutingOptions {
  routes?: RouteObject[];
  path?: string;
  initialEntries?: string[];
  initialIndex?: number;
}

export interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  routingOptions?: RoutingOptions;
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function getIds<T extends EntityWithId>(list: T[]): EntityId[] {
  return list.map((item) => item.id);
}

export function getEntities<T extends EntityWithId>(list: T[]): Record<EntityId, T> {
  return list.reduce((acc: Record<EntityId, T>, item: T) => ({ ...acc, [item.id]: item }), {});
}

const initialRequestStatus: RequestStatus = {
  status: 'idle',
  error: false,
};

export const preloadedStateMock: PreloadedState<RootState> = {
  posts: {
    items: postsResponseMock.posts,
    total: postsResponseMock.posts.length,
    postsRequestStatus: initialRequestStatus,
    singlePostRequestStatus: initialRequestStatus,
  },
  users: {
    ids: getIds(usersMock),
    entities: getEntities(usersMock),
  },
  comments: {
    items: commentsResponseMock.comments,
    total: commentsResponseMock.comments.length,
    commentsRequestStatus: initialRequestStatus,
  },
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    routingOptions,
    preloadedState = preloadedStateMock,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    const routes = routingOptions?.routes ?? [
      {
        path: routingOptions?.path || '/',
        element: children,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: routingOptions?.initialEntries || ['/'],
      initialIndex: routingOptions?.initialIndex || 0,
    });

    return (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
