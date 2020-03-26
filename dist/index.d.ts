/**
 * Welcome to @reach/tabs!
 *
 * An accessible tabs component.
 *
 * The `Tab` and `TabPanel` elements are associated by their order in the tree.
 * None of the components are empty wrappers, each is associated with a real DOM
 * element in the document, giving you maximum control over styling and composition.
 *
 * You can render any other elements you want inside of `Tabs`, but `TabList`
 * should only render `Tab` elements, and `TabPanels` should only render
 * `TabPanel` elements.
 *
 * TODO: Consider manual tab activation
 * https://www.w3.org/TR/wai-aria-practices-1.2/examples/tabs/tabs-2/tabs.html
 *
 * @see Docs     https://reacttraining.com/reach-ui/tabs
 * @see Source   https://github.com/reach/reach-ui/tree/master/packages/tabs
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
 */
import React from "react";
/**
 * Tabs
 *
 * The parent component of the tab interface.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tabs
 */
export declare const Tabs: import("@reach/utils").ComponentWithAs<"div", TabsProps>;
/**
 * @see Docs https://reacttraining.com/reach-ui/tabs#tabs-props
 */
export declare type TabsProps = {
    /**
     * Tabs expects `<TabList>` and `<TabPanels>` as children. The order doesn't
     * matter, you can have tabs on the top or the bottom. In fact, you could have
     * tabs on both the bottom and the top at the same time. You can have random
     * elements inside as well.
     *
     * @see Docs https://reacttraining.com/reach-ui/tabs#tabs-props
     */
    children: React.ReactNode;
    /**
     * Like form inputs, a tab's state can be controlled by the owner. Make sure
     * to include an `onChange` as well, or else the tabs will not be interactive.
     *
     * @see Docs https://reacttraining.com/reach-ui/tabs#tabs-props
     */
    index?: number;
    /**
     * @see Docs https://reacttraining.com/reach-ui/tabs#tabs-props
     */
    readOnly?: boolean;
    /**
     * Starts the tabs at a specific index.
     *
     * @see Docs https://reacttraining.com/reach-ui/tabs#tabs-props
     */
    defaultIndex?: number;
    /**
     * Allows you to switch between horizontally-oriented and vertically-oriented
     * tabs. Defaults to `horizontal`.
     *
     * @see Docs https://reacttraining.com/reach-ui/tabs#tabs-props
     */
    orientation?: "vertical" | "horizontal";
    /**
     * Calls back with the tab index whenever the user changes tabs, allowing your
     * app to synchronize with it.
     *
     * @see Docs https://reacttraining.com/reach-ui/tabs#tabs-props
     */
    onChange?: (index: number) => void;
};
/**
 * TabList
 *
 * The parent component of the tabs.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tablist
 */
export declare const TabList: import("@reach/utils").ComponentWithAs<"div", TabListProps>;
/**
 * @see Docs https://reacttraining.com/reach-ui/tabs#tablist-props
 */
export declare type TabListProps = {
    /**
     * `TabList` expects multiple `Tab` elements as children.
     *
     * `TabPanels` expects multiple `TabPanel` elements as children.
     *
     * @see Docs https://reacttraining.com/reach-ui/tabs#tablist-children
     */
    children?: React.ReactNode;
};
/**
 * Tab
 *
 * The interactive element that changes the selected panel.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tab
 */
export declare const Tab: import("@reach/utils").ComponentWithAs<"button", {
    disabled?: boolean | undefined;
} & TabPanelProps & {
    isSelected?: boolean | undefined;
}>;
/**
 * @see Docs https://reacttraining.com/reach-ui/tabs#tab-props
 */
export declare type TabProps = {
    disabled?: boolean;
} & TabPanelProps;
/**
 * TabPanels
 *
 * The parent component of the panels.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tabpanels
 */
export declare const TabPanels: import("@reach/utils").ComponentWithAs<"div", TabListProps>;
/**
 * @see Docs https://reacttraining.com/reach-ui/tabs#tabpanels-props
 */
export declare type TabPanelsProps = TabListProps & {};
/**
 * TabPanel
 *
 * The panel that displays when it's corresponding tab is active.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tabpanel
 */
export declare const TabPanel: import("@reach/utils").ComponentWithAs<"div", TabPanelProps>;
/**
 * @see Docs https://reacttraining.com/reach-ui/tabs#tabpanel-props
 */
export declare type TabPanelProps = {
    /**
     * `TabPanel` can receive any type of children.
     *
     * @see Docs https://reacttraining.com/reach-ui/tabs#tabpanel-children
     */
    children?: React.ReactNode;
};
