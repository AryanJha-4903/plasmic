import { Dropdown } from "antd";
import { observer } from "mobx-react-lite";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Component, Site, Variant } from "../../../classes";
import { VARIANTS_LOWER } from "../../../shared/Labels";
import { PinStateManager } from "../../../shared/PinManager";
import { isBaseVariant, VariantCombo } from "../../../shared/Variants";
import VariantBadge from "../canvas/VariantsBar/VariantBadge";
import VariantsDrawer from "../canvas/VariantsBar/VariantsDrawer";
import styles from "./VariantComboPicker.module.scss";
import defer = setTimeout;

interface VariantComboPickerProps {
  site: Site;
  component: Component;
  value: VariantCombo;
  onDismiss?: () => void;
  onChange: (combo: VariantCombo) => void;
  onInputEnter?: (e: React.KeyboardEvent) => void;
  onVisibleChange?: (v: boolean) => void;
  autoFocus?: boolean;
  children?: React.ReactNode;
  hideBase?: boolean;
  hideInteractions?: boolean;
  hideScreen?: boolean;
}

export const VariantComboPicker = observer(VariantComboPicker_);

function VariantComboPicker_({
  site,
  component,
  value,
  onChange,
  onDismiss,
  onVisibleChange,
  autoFocus,
  children,
  hideBase,
  hideInteractions,
  hideScreen,
}: VariantComboPickerProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // const preventDismissingRef = useRef(true);

  const machine = new PinStateManager(site, component, new Map());
  const displayVariants = value.filter((v) => !isBaseVariant(v));

  const onRemoveVariant = (variant: Variant) => {
    const newState = machine.removeSelectedVariants(
      { targetVariants: value, pinnedVariants: new Map() },
      [variant]
    );
    onChange(machine.selectedVariants(newState));
  };

  const handleRemoveVariant = (variant: Variant) => {
    const newState = machine.removeSelectedVariants(
      { targetVariants: value, pinnedVariants: new Map() },
      [variant]
    );
    onChange(machine.selectedVariants(newState));
  };

  const handleTargetVariant = (variant: Variant) => {
    const newState = machine.addSelectedVariants(
      { targetVariants: value, pinnedVariants: new Map() },
      [variant]
    );
    onChange(machine.selectedVariants(newState));
  };

  useLayoutEffect(() => {
    if (showDropdown) {
      defer(() => inputRef.current?.focus());
    }
  }, [showDropdown]);

  if (autoFocus) {
    useLayoutEffect(() => {
      setShowDropdown(true);
    }, []);
  }

  return (
    <Dropdown
      transitionName=""
      trigger={["click"]}
      placement={"topLeft"}
      visible={showDropdown}
      onVisibleChange={(v) => {
        onVisibleChange?.(v);
        setShowDropdown(v);
      }}
      overlay={() => (
        <VariantsDrawer
          component={component}
          hideBase={hideBase}
          hideInteractions={hideInteractions}
          hideScreen={hideScreen}
          searchInputRef={inputRef}
          targetedVariants={value}
          onTargetVariant={handleTargetVariant}
          onRemoveVariant={handleRemoveVariant}
          onDismiss={() => {
            onDismiss?.();
            setShowDropdown(false);
          }}
        />
      )}
    >
      {children || (
        <div className={styles.valueContainer}>
          {displayVariants.length === 0 && (
            <div className={styles.placeholder}>
              Select a combination of {VARIANTS_LOWER}
            </div>
          )}
          {displayVariants.map((variant) => (
            <VariantBadge
              isUnpinnable
              isFocused
              component={component}
              isRecording={false}
              variant={variant}
              onUnpin={() => onRemoveVariant(variant)}
            />
          ))}
        </div>
      )}
    </Dropdown>
  );
}
