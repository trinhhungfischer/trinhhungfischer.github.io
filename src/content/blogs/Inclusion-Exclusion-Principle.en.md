---
title: "The Principle of Inclusion–Exclusion"
date: "2026-07-01"
category: "Game Design"
tags: "Math"
excerpt: "The Principle of Inclusion–Exclusion and its application in the set collection problem. Calculating the probability of completing at least one set after N chest openings."
color: "var(--pale-blue)"
---

## I. Problem Introduction and Theory

### 1. The Problem

Suppose we have:
* 3 item sets (A, B, C).
* Each set contains 3 items.
* A total of 9 different items.
* Each time you open a chest, you receive a random item out of the 9 with equal probability.
* After receiving it, the item is conceptually **put back into the pool** (sampling with replacement).

The goal is to calculate:
> **After N chest openings, what is the probability of completing at least one set?**

---

### 2. Breaking Down into Events

Let:
* $A$: Completing set A.
* $B$: Completing set B.
* $C$: Completing set C.

What we want to find is:
$$P(A \cup B \cup C)$$

Which means the probability that **at least one of the three sets is completed**.

---

### 3. Why Can't We Just Add Them?

An initial thought might be:
$$P(A) + P(B) + P(C)$$

But this is incorrect. For example:
* A player could complete both set A and set B at the same time.
* That scenario would be counted twice.

Similarly, if they complete all three sets, it would be counted three times. Therefore, we need a method to eliminate the over-counted overlaps.

---

### 4. The Principle of Inclusion–Exclusion

Let's start with a more intuitive example: **The union of 2 events A and B**.

When we want to calculate the probability of at least one of two events occurring, the most natural way is to add the probabilities of each event: $P(A) + P(B)$.
However, if these two events can occur simultaneously, the intersection $P(A \cap B)$ has been counted **twice** (once in $A$ and once in $B$). To get an accurate result, we must subtract this intersection once.

The formula for 2 events:
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

You can try dragging the sliders in the interactive diagram below to observe the changes:

<interactive-venn></interactive-venn>

From that basic principle, we can expand the logic for our **three-event (three item sets)** problem:

$$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$

What this means for 3 events:
* Add the probabilities of each individual event ($A, B, C$).
* Subtract the pairwise intersections because they were counted twice in the previous step.
* However, after subtracting the pairwise intersections, the central core ($A \cap B \cap C$) was subtracted too many times (completely removed). Therefore, we must **add it back once** at the very end.

This is the core principle of **Inclusion–Exclusion**. It "includes" all elements first, then "excludes" the over-counted overlapping parts, and repeats this process until perfectly balanced.

---

## II. Solving the Math

### 5. Formula for Completing a Single Set

Let's look at set A alone, consisting of 3 items: $A_1$, $A_2$, $A_3$. To complete set A, all three items must appear at least once. Instead of calculating this directly, we look at the opposite event (the complement).

Let $E_1, E_2, E_3$ be the events "never received $A_1$", "never received $A_2$", and "never received $A_3$" respectively. Then:
$$P(A) = 1 - P(E_1 \cup E_2 \cup E_3)$$

According to the Principle of Inclusion–Exclusion, we break down the probabilities of missing items:
$$P(E_1 \cup E_2 \cup E_3) = P(E_1) + P(E_2) + P(E_3) - P(E_1E_2) - P(E_1E_3) - P(E_2E_3) + P(E_1E_2E_3)$$

Let's calculate each component over $N$ chest openings:
* **Missing one item (e.g., missing $A_1$):** The probability of pulling the other 8 items is $\frac{8}{9}$. Raised to the power of $N$ and multiplied by 3 different items: $3 \times \left(\frac{8}{9}\right)^N$.
* **Missing two items (e.g., missing $A_1$ and $A_2$):** The probability of pulling the remaining 7 items is $\frac{7}{9}$. There are $\binom{3}{2} = 3$ pairs of items: $3 \times \left(\frac{7}{9}\right)^N$.
* **Missing all three items:** Not pulling any item from set A (only pulling the 6 items from B and C): $\left(\frac{6}{9}\right)^N$.

Putting it all together, the probability of completing **one specific set (set A)** is:
$$P(A) = 1 - \left[ 3\left(\frac{8}{9}\right)^N - 3\left(\frac{7}{9}\right)^N + \left(\frac{6}{9}\right)^N \right]$$

---

### 6. Probability of Completing At Least One Set

Once we have $P(A)$, to find the probability of "completing at least one of the three sets", we apply Inclusion–Exclusion again on a larger scale:
$$P(\text{at least one set}) = 3P(A) - 3P(A \cap B) + P(A \cap B \cap C)$$

Where:
* $P(A)$: completing one set.
* $P(A \cap B)$: completing two sets simultaneously.
* $P(A \cap B \cap C)$: completing all three sets.

The intersection probabilities (e.g., $P(A \cap B)$ - completing sets A and B at the same time, a total of 6 items) are also calculated using the exact same Inclusion-Exclusion principle, just with a different total number of required items.

To write this compactly, let $P_k$ be the probability of collecting a specific collection of $k$ items, we have a general formula for a set of $k$ items:
$$P_k = \sum_{i=0}^k (-1)^i \binom{k}{i} \left(\frac{9-i}{9}\right)^N$$

Then, the final formula for the entire problem beautifully simplifies to:
$$P(\text{at least 1 set}) = 3P_3 - 3P_6 + P_9$$

To see the power of this principle, let's calculate the probability of **completing at least any one set** ($P(A \cup B \cup C)$) at different milestones of $N$:

| Chests Opened ($N$) | Probability of completing at least 1 set |
| :---: | :--- |
| **3** | $\approx 2.5\%$ *(The perfect scenario: 3 pulls yielding exactly 3 items from the same set)* |
| **5** | $\approx 17.2\%$ |
| **10** | $\approx 73.1\%$ |
| **15** | $\approx 95.0\%$ |
| **20** | $\approx 99.4\%$ |

> [!NOTE]  
> **The Illusion of Probability (Cognitive Bias)**  
> When looking at 9 items with equally divided drop rates, human intuition usually assumes it would take a massive number of attempts to accidentally gather all 3 items of a specific set.
> However, when we look at completing **at least any one set**, the rate at which this probability grows is extremely fast, similar to the **Birthday Paradox**. With just 10 chest openings, the win rate surpasses 73%, and at 15 openings, you are almost guaranteed (95%) to own at least one fully complete set!

---

## III. Conclusion and Expansion

### 7. General Rule

Suppose there are:
* $m$ sets.
* Each set has $k$ items.

The probability of completing a single set always follows this rule:
$$P(\text{complete set}) = \sum_{i=0}^{k} (-1)^i \binom{k}{i} \left(\frac{mk-i}{mk}\right)^N$$

The alternating coefficients in front (e.g., 1, 3, 3, 1 for $k=3$) are not random, they are exactly the **binomial coefficients** $\binom{k}{i}$, which appear incredibly naturally from the Principle of Inclusion–Exclusion.

---

### 8. Core Takeaways

* **Do not calculate directly** the probability of "having everything". Instead, switch to calculating the complement: "missing at least one".
* The scenarios of missing items overlap heavily, so they cannot be simply added together.
* Use the **Principle of Inclusion–Exclusion** to alternately add and subtract, eliminating the over-counted overlaps.
* After finding the probability of missing items, subtract from **1** to get the probability of a completed set.
* Applying this formula in practice (like in gacha games) shows us **cognitive illusions**: the speed of acquiring a full set happens much faster than a player's subjective feeling expects.

This is one of the most powerful foundational techniques, widely used in the **Coupon Collector Problem**, designing gacha systems, loot boxes, item collection, and many other statistical problems in Game Design.
