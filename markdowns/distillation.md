# Table of contents  

# Distillation

Distillation is the separation of a liquid mixture into its various components.

## Phase (Temperature composition) diagram

### Description

Imagine a mixture of two liquids. Say, for example, *Benzene-Toluene*. See info about this mixture [here](https://theengblog.vercel.app/post/processengineeringterms#benzene-toluene-mixture)

Let's list the boiling points:
- Benzene ($ C_6 H_6 $): 80.1°C
- Toluene ($ C_7 H_8 $): 110.6°C

Now, if we had pure Benzene (*call it A*), then the mixture would boil at $ T_A $. Similarly for pure Toluene, it would boil at $ T_B $.

Any mixture of $ x_A $ component of A and $ x_B $ component of B would boil at a temperature in this range ($ T_A <= T <= T_B $).

As such, it is very convenient to plot the phase diagram of this composition, which shows the boiling point (called the **vapor curve**) of this mixture as a function of the composition.

Also, note that A is the less volatile substance and B is the more volatile substance, as it evaporates sooner.

![benzene](2.png)

### Distillation through phase diagram

A mixture which undergoes distillation will experience various forms both in liquid composition and in vapor composition. We can best see, and plot these, via the phase diagram.

![](phasediagram.png)

Let's say that our liquid starts at composition $ x=x_2 $. At point G, it will consist only of the liquid mixture. As it is heated to $ T=T_2 $, or point B, some part of that mixture will start to boil.

Heat it to point M, and we've got a liquid as well as a vapor mixture, each with its own composition.

- Firstly, the L-V composition proportions can be determined via the $ \frac{LM}{LN} $ and $ \frac{MN}{LN} $ proportions.

- Secondly, the compositions of each of these phases can be found via extending the vertical lines through points L and N.

- Finally, a complete evaporation will lead (*conservation of matter*) to the same composition, albeit in vapor phase. This can be seen at $ T = T_1 $ and a vapor composition of $ x = y_1 $ of substance A.

### Purity

Note that simply heating the liquid more and more, and subsequently causing more evaporation, will completely evaporate the entire mixture, which does not help with the distillation process.

What we want, is more of B and less of A in vapor form. As you can see, the maximum purity can be reached directly after the boiling starts, with a vapor composition of $ x = y_2 $ (or point E). However, there is hardly any vapor here, hence less of the distilled material.

Heating the mixture to a higher temperature results in less fine of a mixture, with higher vapor production.
So there is a balance to be achieved through tuning each of these factors.

## Partial Pressure and composition laws

# Distillation types

## Differential distillation

### Code

The code used to simulate a differential distillation for an ideal mixture and with constant relative volatility is as follows:

```matlab
% plotting differential distillation
function y = plotDiff(x0,x,S0,a, graphColor)
    % Default graph color if not provided
    if nargin < 5
        graphColor = [0 1 0];  % Green color
    end
    i = linspace(x0, x, 1000);
    k = log((1-x0)./(1-i));
    j = log(i.*(1-x0)./(x0.*(1-i)));
    l = (1/(a-1)).*j+k;
    y = S0 * exp(l);
    hold on;
    plot(i,y, "Color",graphColor);
    title("Final element moles in terms of starting composition");
end
```

### Results

![Distillation Process](/DistillationResults.png)
Red:plotDiff(0.8,0.1,10,10,[1 0 0]);
Green:plotDiff(0.8,0.1,10,3);