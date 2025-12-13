import type { Brand } from "./utility_types.ts";

/** Represents a duration of time in milliseconds. */
export type Milliseconds = Brand<number, "milliseconds">;
/** Represents a duration of time in seconds. */
export type Seconds = Brand<number, "seconds">;
/** Represents a duration of time in minutes. */
export type Minutes = Brand<number, "minutes">;
/** Represents a duration of time in hours. */
export type Hours = Brand<number, "hours">;
/** Represents a duration of time in days. */
export type Days = Brand<number, "days">;
/** Represents a duration of time in weeks. */
export type Weeks = Brand<number, "weeks">;
/** Represents a duration of time in years. */
export type Years = Brand<number, "years">;

/**
 * A representation of a duration of time within a codebase.
 * This class provides a way to work with durations of time in a type-safe manner.
 *
 * @example Converting seconds to milliseconds
 * ```ts
 * setTimeout(() => {}, Duration.fromSeconds(1 as Seconds).toMilliseconds());
 * ```
 * @example Converting minutes to milliseconds
 * ```ts
 * setTimeout(() => {}, Duration.fromMinutes(1 as Minutes).toMilliseconds());
 * ```
 */
export class Duration {
  private constructor(private readonly milliseconds: Milliseconds) {}

  /**
   * Creates a Duration from milliseconds.
   */
  static fromMilliseconds(milliseconds: Milliseconds): Duration {
    return new Duration(milliseconds);
  }

  /**
   * Creates a Duration from seconds.
   */
  static fromSeconds(seconds: Seconds): Duration {
    return new Duration(seconds * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from minutes.
   */
  static fromMinutes(minutes: Minutes): Duration {
    return new Duration(minutes * 60 * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from hours.
   */
  static fromHours(hours: Hours): Duration {
    return new Duration(hours * 60 * 60 * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from days.
   */
  static fromDays(days: Days): Duration {
    return new Duration(days * 24 * 60 * 60 * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from weeks.
   */
  static fromWeeks(weeks: Weeks): Duration {
    return new Duration(weeks * 7 * 24 * 60 * 60 * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from years.
   */
  static fromYears(years: Years): Duration {
    return new Duration(years * 365 * 24 * 60 * 60 * 1000 as Milliseconds);
  }

  /**
   * Converts the duration to milliseconds.
   */
  toMilliseconds(): Milliseconds {
    return this.milliseconds;
  }

  /**
   * Converts the duration to seconds.
   */
  toSeconds(): Seconds {
    return this.milliseconds / 1000 as Seconds;
  }

  /**
   * Converts the duration to minutes.
   */
  toMinutes(): Minutes {
    return this.milliseconds / (60 * 1000) as Minutes;
  }

  /**
   * Converts the duration to hours.
   */
  toHours(): Hours {
    return this.milliseconds / (60 * 60 * 1000) as Hours;
  }

  /**
   * Converts the duration to days.
   */
  toDays(): Days {
    return this.milliseconds / (24 * 60 * 60 * 1000) as Days;
  }

  /**
   * Converts the duration to weeks.
   */
  toWeeks(): Weeks {
    return this.milliseconds / (7 * 24 * 60 * 60 * 1000) as Weeks;
  }

  /**
   * Converts the duration to years.
   */
  toYears(): Years {
    return this.milliseconds / (365 * 24 * 60 * 60 * 1000) as Years;
  }
}
