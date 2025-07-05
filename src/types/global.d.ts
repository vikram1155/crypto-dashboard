export {};

declare global {
  interface Window {
    perspective: typeof import("@finos/perspective");
  }

  namespace JSX {
    interface IntrinsicElements {
      "perspective-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          view?: string;
          "row-pivots"?: string;
          columns?: string;
          sort?: string;
        },
        HTMLElement
      >;
    }
  }
}
