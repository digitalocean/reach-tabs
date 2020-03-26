import React, { useRef, useEffect, useState, useMemo, useContext, Children } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { useDescendants, DescendantProvider, useDescendantKeyDown, useDescendant, createDescendantContext } from '@reach/descendants';
import { forwardRefWithAs, makeId, noop, checkStyles, isNumber, useForkedRef, getElementComputedStyle, wrapEvent, useIsomorphicLayoutEffect, boolOrBoolString, cloneValidElement, useUpdateEffect, createNamedContext } from '@reach/utils';
import { useId } from '@reach/auto-id';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var TabsDescendantsContext = /*#__PURE__*/createDescendantContext("TabsDescendantsContext");
var TabPanelDescendantsContext = /*#__PURE__*/createDescendantContext("TabPanelDescendantsContext");
var TabsContext = /*#__PURE__*/createNamedContext("TabsContext", {});

var useTabsContext = function useTabsContext() {
  return useContext(TabsContext);
}; ////////////////////////////////////////////////////////////////////////////////

/**
 * Tabs
 *
 * The parent component of the tab interface.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tabs
 */


var Tabs = /*#__PURE__*/forwardRefWithAs(function Tabs(_ref, ref) {
  var _props$id;

  var _ref$as = _ref.as,
      Comp = _ref$as === void 0 ? "div" : _ref$as,
      children = _ref.children,
      defaultIndex = _ref.defaultIndex,
      _ref$orientation = _ref.orientation,
      orientation = _ref$orientation === void 0 ? "horizontal" : _ref$orientation,
      _ref$index = _ref.index,
      controlledIndex = _ref$index === void 0 ? undefined : _ref$index,
      onChange = _ref.onChange,
      _ref$readOnly = _ref.readOnly,
      readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "children", "defaultIndex", "orientation", "index", "onChange", "readOnly"]);

  var isControlled = useRef(controlledIndex != null);
  useEffect(function () {
    if (process.env.NODE_ENV !== "production") {
      process.env.NODE_ENV !== "production" ? warning(!(isControlled.current && controlledIndex == null), "Tabs is changing from controlled to uncontrolled. Tabs should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Tabs for the lifetime of the component. Check the `index` prop being passed in.") : void 0;
      process.env.NODE_ENV !== "production" ? warning(!(!isControlled.current && controlledIndex != null), "Tabs is changing from uncontrolled to controlled. Tabs should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled Tabs for the lifetime of the component. Check the `index` prop being passed in.") : void 0;
    }
  }, [controlledIndex]);

  var _id = useId(props.id);

  var id = (_props$id = props.id) !== null && _props$id !== void 0 ? _props$id : makeId("tabs", _id);
  var childrenArray = React.Children.toArray(children);
  var indexOfTabPanels = childrenArray.findIndex(function (child) {
    return React.isValidElement(child) && child.type === TabPanels;
  });
  var indexOfTabList = childrenArray.findIndex(function (child) {
    return React.isValidElement(child) && child.type === TabList;
  });
  var listBeforePanels = indexOfTabList > -1 && indexOfTabPanels > -1 && indexOfTabList < indexOfTabPanels;
  /*
   * We only manage focus if the user caused the update vs. a new controlled
   * index coming in.
   */

  var userInteractedRef = useRef(false);
  var selectedPanelRef = useRef(null);

  var _useState = useState(defaultIndex || 0),
      selectedIndex = _useState[0],
      setSelectedIndex = _useState[1];

  var _useDescendants = useDescendants(),
      tabs = _useDescendants[0],
      setTabs = _useDescendants[1];

  var context = useMemo(function () {
    return {
      isControlled: isControlled.current,
      selectedIndex: isControlled.current ? controlledIndex : selectedIndex,
      orientation: orientation,
      listBeforePanels: listBeforePanels,
      id: id,
      userInteractedRef: userInteractedRef,
      selectedPanelRef: selectedPanelRef,
      setSelectedIndex: isControlled.current ? noop : setSelectedIndex,
      onFocusPanel: function onFocusPanel() {
        var _selectedPanelRef$cur;

        (_selectedPanelRef$cur = selectedPanelRef.current) === null || _selectedPanelRef$cur === void 0 ? void 0 : _selectedPanelRef$cur.focus();
      },
      onSelectTab: readOnly ? noop : function (index) {
        userInteractedRef.current = true;
        onChange && onChange(index);

        if (!isControlled.current) {
          setSelectedIndex(index);
        }
      }
    };
  }, [controlledIndex, orientation, listBeforePanels, id, onChange, readOnly, selectedIndex]);
  useEffect(function () {
    return checkStyles("tabs");
  }, []);
  return React.createElement(DescendantProvider, {
    context: TabsDescendantsContext,
    items: tabs,
    set: setTabs
  }, React.createElement(TabsContext.Provider, {
    value: context
  }, React.createElement(Comp, Object.assign({}, props, {
    ref: ref,
    "data-reach-tabs": "",
    id: props.id,
    "data-reach-tabs-orientation": orientation
  }), children)));
});

if (process.env.NODE_ENV !== "production") {
  Tabs.displayName = "Tabs";
  Tabs.propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    index: function index(props, name, compName, location, propName) {
      var val = props[name];

      if (props.index > -1 && props.onChange == null && props.readOnly !== true) {
        return new Error("You provided a value prop to `" + compName + "` without an `onChange` handler. This will render a read-only tabs element. If the tabs should be mutable use `defaultIndex`. Otherwise, set `onChange`.");
      } else if (props[name] != null && !isNumber(props[name])) {
        return new Error("Invalid prop `" + propName + "` supplied to `" + compName + "`. Expected `number`, received `" + (Array.isArray(val) ? "array" : typeof val) + "`.");
      }

      return null;
    },
    defaultIndex: PropTypes.number
  };
} ////////////////////////////////////////////////////////////////////////////////

/**
 * TabList
 *
 * The parent component of the tabs.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tablist
 */


var TabList = /*#__PURE__*/forwardRefWithAs(function TabList(_ref2, forwardedRef) {
  var children = _ref2.children,
      _ref2$as = _ref2.as,
      Comp = _ref2$as === void 0 ? "div" : _ref2$as,
      onKeyDown = _ref2.onKeyDown,
      props = _objectWithoutPropertiesLoose(_ref2, ["children", "as", "onKeyDown"]);

  var _useTabsContext = useTabsContext(),
      isControlled = _useTabsContext.isControlled,
      onSelectTab = _useTabsContext.onSelectTab,
      onFocusPanel = _useTabsContext.onFocusPanel,
      setSelectedIndex = _useTabsContext.setSelectedIndex,
      selectedIndex = _useTabsContext.selectedIndex,
      orientation = _useTabsContext.orientation,
      listBeforePanels = _useTabsContext.listBeforePanels;

  var _useContext = useContext(TabsDescendantsContext),
      descendants = _useContext.descendants;

  var ownRef = useRef(null);
  var ref = useForkedRef(forwardedRef, ownRef);
  var isRTL = useRef(false);
  useEffect(function () {
    if (ownRef.current && (ownRef.current.ownerDocument && ownRef.current.ownerDocument.dir === "rtl" || getElementComputedStyle(ownRef.current, "direction") === "rtl")) {
      isRTL.current = true;
    }
  }, []);
  var handleKeyDown = wrapEvent(function (event) {
    var keyToMatch;

    if (orientation === "vertical") {
      if (isRTL.current) {
        keyToMatch = listBeforePanels ? "ArrowLeft" : "ArrowRight";
      } else {
        keyToMatch = listBeforePanels ? "ArrowRight" : "ArrowLeft";
      }
    } else {
      keyToMatch = listBeforePanels ? "ArrowDown" : "ArrowUp";
    }

    if (event.key === keyToMatch) {
      event.preventDefault();
      onFocusPanel();
    }
  }, useDescendantKeyDown(TabsDescendantsContext, {
    currentIndex: selectedIndex,
    orientation: orientation,
    rotate: true,
    callback: onSelectTab,
    filter: function filter(tab) {
      return !tab.disabled;
    },
    rtl: isRTL.current
  }));
  useIsomorphicLayoutEffect(function () {
    var _descendants$selected;

    /*
     * In the event an uncontrolled component's selected index is disabled,
     * (this should only happen if the first tab is disabled and no default
     * index is set), we need to override the selection to the next selectable
     * index value.
     */
    if (!isControlled && boolOrBoolString((_descendants$selected = descendants[selectedIndex]) === null || _descendants$selected === void 0 ? void 0 : _descendants$selected.disabled)) {
      var next = descendants.find(function (tab) {
        return !tab.disabled;
      });

      if (next) {
        setSelectedIndex(next.index);
      }
    }
  }, [descendants, isControlled, selectedIndex, setSelectedIndex]);
  return React.createElement(Comp // If the `tablist` element is vertically oriented, it has the property
  // `aria-orientation` set to `"vertical"`. The default value of
  // `aria-orientation` for a tablist element is `"horizontal"`.
  // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
  // aria-orientation={vertical ? "vertical" : undefined}
  // The element that serves as the container for the set of tabs has role
  // `tablist`
  // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
  , Object.assign({
    // If the `tablist` element is vertically oriented, it has the property
    // `aria-orientation` set to `"vertical"`. The default value of
    // `aria-orientation` for a tablist element is `"horizontal"`.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
    // aria-orientation={vertical ? "vertical" : undefined}
    // The element that serves as the container for the set of tabs has role
    // `tablist`
    // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
    role: "tablist"
  }, props, {
    "data-reach-tab-list": "",
    "aria-orientation": orientation,
    ref: ref,
    onKeyDown: wrapEvent(onKeyDown, handleKeyDown)
  }), Children.map(children, function (child, index) {
    /*
     * TODO: Since refactoring to use context rather than depending on
     * parent/child relationships, we need to update our recommendations for
     * animations that break when we don't forward the `isSelected` prop
     * to our tabs. We will remove this in 1.0 and update our docs
     * accordingly.
     */
    return cloneValidElement(child, {
      isSelected: index === selectedIndex
    });
  }));
});

if (process.env.NODE_ENV !== "production") {
  TabList.displayName = "TabList";
  TabList.propTypes = {
    as: PropTypes.any,
    children: PropTypes.node
  };
} ////////////////////////////////////////////////////////////////////////////////

/**
 * Tab
 *
 * The interactive element that changes the selected panel.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tab
 */


var Tab = /*#__PURE__*/forwardRefWithAs(function Tab(_ref3, forwardedRef) {
  var children = _ref3.children,
      _ = _ref3.isSelected,
      _ref3$as = _ref3.as,
      Comp = _ref3$as === void 0 ? "button" : _ref3$as,
      disabled = _ref3.disabled,
      props = _objectWithoutPropertiesLoose(_ref3, ["children", "isSelected", "as", "disabled"]);

  var _useTabsContext2 = useTabsContext(),
      tabsId = _useTabsContext2.id,
      onSelectTab = _useTabsContext2.onSelectTab,
      selectedIndex = _useTabsContext2.selectedIndex,
      userInteractedRef = _useTabsContext2.userInteractedRef;

  var ownRef = useRef(null);
  var ref = useForkedRef(forwardedRef, ownRef);
  var index = useDescendant({
    element: ownRef.current,
    context: TabsDescendantsContext,
    disabled: !!disabled
  });
  var isSelected = index === selectedIndex;

  function onSelect() {
    onSelectTab(index);
  }

  useUpdateEffect(function () {
    if (isSelected && ownRef.current && userInteractedRef.current) {
      userInteractedRef.current = false;
      ownRef.current.focus();
    }
  }, [isSelected]);
  return React.createElement(Comp // Each element with role `tab` has the property `aria-controls` referring
  // to its associated `tabpanel` element.
  // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
  , Object.assign({
    "aria-controls": makeId(tabsId, "panel", index),
    "aria-disabled": disabled,
    "aria-selected": isSelected,
    // Each element that serves as a tab has role `tab` and is contained
    // within the element with role `tablist`.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
    role: "tab",
    tabIndex: isSelected ? 0 : -1
  }, props, {
    ref: ref,
    "data-reach-tab": "",
    "data-selected": isSelected ? "" : undefined,
    disabled: disabled,
    id: makeId(tabsId, "tab", index),
    onClick: onSelect
  }), children);
});

if (process.env.NODE_ENV !== "production") {
  Tab.displayName = "Tab";
  Tab.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool
  };
} ////////////////////////////////////////////////////////////////////////////////

/**
 * TabPanels
 *
 * The parent component of the panels.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tabpanels
 */


var TabPanels = /*#__PURE__*/forwardRefWithAs(function TabPanels(_ref4, forwardedRef) {
  var children = _ref4.children,
      _ref4$as = _ref4.as,
      Comp = _ref4$as === void 0 ? "div" : _ref4$as,
      props = _objectWithoutPropertiesLoose(_ref4, ["children", "as"]);

  var _useDescendants2 = useDescendants(),
      tabPanels = _useDescendants2[0],
      setTabPanels = _useDescendants2[1];

  return React.createElement(DescendantProvider, {
    context: TabPanelDescendantsContext,
    items: tabPanels,
    set: setTabPanels
  }, React.createElement(Comp, Object.assign({}, props, {
    ref: forwardedRef,
    "data-reach-tab-panels": ""
  }), children));
});

if (process.env.NODE_ENV !== "production") {
  TabPanels.displayName = "TabPanels";
  TabPanels.propTypes = {
    as: PropTypes.any,
    children: PropTypes.node
  };
} ////////////////////////////////////////////////////////////////////////////////

/**
 * TabPanel
 *
 * The panel that displays when it's corresponding tab is active.
 *
 * @see Docs https://reacttraining.com/reach-ui/tabs#tabpanel
 */


var TabPanel = /*#__PURE__*/forwardRefWithAs(function TabPanel(_ref5, forwardedRef) {
  var children = _ref5.children,
      ariaLabel = _ref5["aria-label"],
      _ref5$as = _ref5.as,
      Comp = _ref5$as === void 0 ? "div" : _ref5$as,
      props = _objectWithoutPropertiesLoose(_ref5, ["children", "aria-label", "as"]);

  var _useTabsContext3 = useTabsContext(),
      selectedPanelRef = _useTabsContext3.selectedPanelRef,
      selectedIndex = _useTabsContext3.selectedIndex,
      tabsId = _useTabsContext3.id;

  var ownRef = useRef(null);
  var index = useDescendant({
    element: ownRef.current,
    context: TabPanelDescendantsContext
  });
  var isSelected = index === selectedIndex;
  var id = makeId(tabsId, "panel", index);
  var ref = useForkedRef(forwardedRef, ownRef, isSelected ? selectedPanelRef : null);
  return React.createElement(Comp // Each element with role `tabpanel` has the property `aria-labelledby`
  // referring to its associated tab element.
  , Object.assign({
    "aria-labelledby": makeId(tabsId, "tab", index),
    hidden: !isSelected,
    // Each element that contains the content panel for a tab has role
    // `tabpanel`.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
    role: "tabpanel",
    tabIndex: isSelected ? 0 : -1
  }, props, {
    ref: ref,
    "data-reach-tab-panel": "",
    id: id
  }), children);
});

if (process.env.NODE_ENV !== "production") {
  TabPanel.displayName = "TabPanel";
  TabPanel.propTypes = {
    as: PropTypes.any,
    children: PropTypes.node
  };
}

export { Tab, TabList, TabPanel, TabPanels, Tabs };
//# sourceMappingURL=tabs.esm.js.map
