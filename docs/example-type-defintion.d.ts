// if we want to create a definitely type style file 

declare module "react-side-effect" {

    import React = __React;

    function withSideEffect(
        reducePropsToState: (propsList: any[]) => any,
        handleStateChangeOnClient: (state: any) => any,
        mapStateOnServer: (state: any) => any
    ): (WrappedComponent: React.Component<any, any>) => React.Component<any, any>;

    export = withSideEffect;
}
