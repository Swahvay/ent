/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  DayOfWeekBaseMixin,
  IDayOfWeekBase,
} from "../generated/mixins/day_of_week_base";
import { ExampleViewer as ExampleViewerAlias } from "../../viewer/viewer";

export interface IDayOfWeek<
  TViewer extends ExampleViewerAlias = ExampleViewerAlias,
> extends IDayOfWeekBase<TViewer> {
  isDayOfWeek(): boolean;

  // add custom fields
}

type Constructor<T extends IDayOfWeek = IDayOfWeek> = new (...args: any[]) => T;

export function isDayOfWeek(ent: unknown): ent is IDayOfWeek {
  const o = ent as IDayOfWeek;
  return (o.isDayOfWeek && o.isDayOfWeek()) ?? false;
}

export function DayOfWeekMixin<T extends Constructor>(BaseClass: T) {
  return class DayOfWeekMixin
    extends DayOfWeekBaseMixin(BaseClass)
    implements IDayOfWeek
  {
    isDayOfWeek() {
      return true;
    }

    // add custom fields implementation
  };
}
