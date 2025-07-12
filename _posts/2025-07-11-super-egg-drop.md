---
layout: post
title: Super Egg Drop
date: 2025-07-11 22:20:00
description: An algorithm problem I find interesting and inspiring
tag: ["computer science", "algorithms"]
categories: study
---

It has been a while since the last post. This is because things
has been quite busy recently, and there is nothing much to write about.
However, recently I came across this interesting algorithm problem on 
leetcode called 
[Super Egg Drop](https://leetcode.com/problems/super-egg-drop/description/).
Therefore this post will be an editorial of the problem. 

## Problem 

You are given $K$ identical eggs and you have access to a building with $n$ 
floors labeled from $1$ to $n$. You know that there exists a floor $f$ 
where $0 \leq f \leq N$ such that any egg dropped at a floor higher than 
$f$ will break, and any egg dropped at or below floor f will not break.

Each move, you may take an unbroken egg and drop it from any floor $x$
(where $1 \leq x \leq N$). If the egg breaks, you can no longer use it.
However, if the egg does not break, you may reuse it in future moves.

Return the minimum number of moves that you need to determine with 
certainty what the value of $f$ is.

#### Constraints 
- $1 \leq K \leq 100$
- $1 \leq N \leq 10^4$

## Example 

To see why the egg breaks make things harder, consider
if the eggs will not break, which is equivalent to when we have 
unlimited number of eggs. We can then use a binary search techique 
to shrink the possible range of $f$ by half every move. However, if 
we only have $1$ egg and this egg will break, we must use $n$ moves
to determine what $f$ is, if $0 \leq f \leq n$. The strategy we will use 
is to throw the egg from $x = 1$ all the way to $x = n$. If the egg
breaks when $x = i$, then we know $f = i - 1$. If the eggs doesn't 
break at all, then $f = n$. The reason why we must use
this strategy is because if we drop the egg somewhere in the middle, let's 
say $x = i$. If the egg breaks then we only know $0 \leq f \leq i - 1$, 
and we have no eggs to determine where $f$ actually is. If we have more than 
one egg, we can reach something like a balance between the binary search 
strategy and the linear search strategy. 

Consider this example where $k = 2$ and $n = 6$. The minimum moves needed
for us to determine with certainty what the value of $f$ is $3$. One optimal 
strategy is as follows:
- Drop the first egg on $x = 2$. 
- If the egg breaks then we know $0 \leq f \leq 2$. Drop the second egg 
on $x = 1$ and $x = 2$ respectively.
- If the first egg doesn't break, then drop the first egg agin on floor
$5$. If it breaks then $3 \leq f \leq 4$ and drop the second egg on $x = 4$.
Otherwise $5 \leq f \leq 6$ and drop the second egg on $x = 6$.

## Solution

It is not hard to realize that the minimum number of moves given $k$ eggs
is only dependent how large the range of $f$ is. Then we can identify this 
as a subproblem for dynamic programming. Let $T(n, k)$ be the minimum number
of moves needed with $k$ eggs and the size of the range of $f$ is $n$. 
Therefore in the given problem we want to know $T(n + 1, k)$, as 
$0 \leq f \leq n$ so there is $n + 1$ possible values of $f$.

Also note here for a possible range of $f$, say $a \leq f \leq b$. It 
is guaranteed that when we drop the egg on $x = a$, the egg will not break.
For example originally if we drop the egg on $x = 0$ the egg will not break,
so the problem does not even allow us to drop it on $x = 0$. It is 
meaningless anyway. This property also holds for our subproblems.
For example when we drop the egg on $x = i$. If it breaks then 
$0 \leq f \leq i - 1$, and we know egg will not break when dropeed on 
$x = 0$. If it does not break then we know $i \leq f \leq n$, and 
we already know it will not break on $x = i$.

With these discussion, we have the following recurrence for our dynamic
programming: 

$$
T(n, k) = 1 + \min_{1 \leq i \leq n - 1} \max 
\left\{ T(i, k - 1), T(n - i, k) \right\}.
$$

Why is this the recurrence relationship? Suppose WLOG here $0 \leq f \leq
n - 1$, and we drop the egg on $x = i$, where $1 \leq i \leq n - 1$. Then
if it breaks we are left with $k - 1$ eggs and $0 \leq f \leq i - 1$, 
which explains the $T(i, k - 1)$. If it does not break then it is $T(n - i, 
k)$. For worst case, we need to take the max of the two, but for 
optimal strategy, we take the min among $1 \leq i \leq n - 1$.

For boundary conditions, we clearly have $T(1, k) = 0$ for any $k \geq 1$.
With the discussion above, we also know that $T(n, 1) = n - 1$, for 
dropping the eggs at $x = 1$ all the way to $x = n - 1$.

Now for the brute force approach, we use the recurrence relation to calculate
$T(n, k)$ for all $1 \leq n \leq N$ and $1 \leq k \leq K$. There are $NK$
nodes, but calculating each node takes $O(N)$ time as we need to 
take the min among $1 \leq i \leq n - 1$. This leads to a total $O(N^2 K)$
time. For the given constraints, this will cause Time Limit Exceeded 
for worst case.

The question then becomes, how can we optimize this?

### Method 1

It is important to note here our desired function $T(n, k)$ is clearly 
increasing against $n$. When there are a bigger search space but same 
number of eggs, we need more moves. This means that for fixed $n$ and 
$k$, for example when we are calculating $T(n, k)$, the function 
$T(i, k - 1)$ is increasing against $i$, and the function $T(n - i, k)$
is decreasing against $i$.

<div class="row mt-1">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/super-egg-drop-1.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Illustration of monotonicity of $T(n, k)$.
</div>

Now it is clear that the min is achieved when $T(i, k - 1) = T(n - i, k)$.
We can then binary search for the first $i$ such that 
$T(i, k - 1) \geq T(n - i, k)$. The min is then between 
$\max \{ T(i, k - 1), T(n - i, k) \}$
and $\max \{ T(i - 1, k - 1), T(n + 1 - i, k) \}$. Of course make 
sure the index is within range. 

Using binary search, we have lower the cost for each node from $O(N)$ to 
$O(\log N)$. The total time is then $O(N K \log N)$. This is already enough 
to pass this problem.

For simplicity we can just use Python and memoization DP. The code is as 
below:
```python
class Solution:
    def superEggDrop(self, k: int, n: int) -> int:
        @cache
        def f(n, k):
            if n == 1:
                return 0
            if k == 1:
                return n - 1
            lo = 1
            hi = n
            while (lo < hi):
                mid = lo + (hi - lo) // 2
                if f(mid, k - 1) < f(n - mid, k):
                    lo = mid + 1
                else:
                    hi = mid
            if lo == n:
                return 1 + max(f(n - 1, k - 1), f(1, k))
            if lo == 1:
                return 1 + max(f(1, k - 1), f(n - 1, k))
            return 1 + min(max(f(lo, k - 1), f(n - lo, k)), max(f(lo - 1, k - 1), f(n - lo + 1, k)))
        return f(n + 1, k)
```

For bottom-up DP we can just deal with $k$ from small to large, and $n$
from small to large iteratively. The code is omitted here.

## Method 2

