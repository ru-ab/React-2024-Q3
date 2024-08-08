'use client';
import {
  AppRouterInstance,
  NavigateOptions,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

class SearchParamsBuilder {
  private searchParams: URLSearchParams;
  private router: AppRouterInstance;
  private pathname: string;

  constructor(
    router: AppRouterInstance,
    pathname: string,
    searchParams: ReadonlyURLSearchParams
  ) {
    this.router = router;
    this.pathname = pathname;
    this.searchParams = new URLSearchParams(searchParams.toString());
  }

  get(name: string) {
    return this.searchParams.get(name);
  }

  set(name: string, value: string) {
    this.searchParams.set(name, value);
    return this;
  }

  delete(name: string) {
    this.searchParams.delete(name);
    return this;
  }

  deleteAll() {
    const params = [...this.searchParams.keys()];
    params.forEach((name) => {
      this.searchParams.delete(name);
    });
    return this;
  }

  apply(options?: NavigateOptions) {
    this.router.push(
      `${this.pathname}?${this.searchParams.toString()}`,
      options
    );
  }
}

export function useSearchParamsBuilder() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return new SearchParamsBuilder(router, pathname, searchParams);
}
