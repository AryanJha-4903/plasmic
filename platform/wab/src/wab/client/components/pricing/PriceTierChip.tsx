// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import * as React from "react";
import {
  DefaultPriceTierChipProps,
  PlasmicPriceTierChip,
} from "../../plasmic/plasmic_kit_pricing/PlasmicPriceTierChip";

export interface PriceTierChipProps extends DefaultPriceTierChipProps {}

function PriceTierChip_(
  props: PriceTierChipProps,
  ref: HTMLElementRefOf<"div">
) {
  return <PlasmicPriceTierChip root={{ ref }} {...props} />;
}

const PriceTierChip = React.forwardRef(PriceTierChip_);
export default PriceTierChip;
