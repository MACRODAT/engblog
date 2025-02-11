# Table of contents  

# Thermodynamic Properties

## Degree of freedom

A pure substance is composed of a single chemical element ($O_2$) or compound ($H_2 O$), as long as it is chemically homogeneous throughout. However, a pure substance can still exist in different phases.

A substance that exists in one phase is said to be **homegeneous** and is said to be **heterogeneous** otherwise.

Gibbs's rule gives an estimate of the number of degrees of freedom of a substance, or simply the number of intensive properties that can be varied to fix the state of individual phases:

$$
    f = C - P + 2
$$

## Properties

### Specific volume

The specific volume is an intensive property (it does not depend on the size) of a system. It is express as:

$$
    \nu = \frac{V}{M}
$$

For a single phase homogenous system, it is:

$$
    d\nu = \left(\frac{\partial \nu}{\partial p} \right)_T dp + \left(\frac{\partial \nu}{\partial T} \right)_P dT
$$
 
Then with some rearranging, then integration:

$$
    ln(\frac{\nu_2}{\nu_1}) = \beta * (T_2 - T_1) - \kappa * (P_2 - P_1)
$$

with:

- $\beta$ : Isobaric coefficient of volume expansion
- $\kappa$ : Isothermal coefficient of compressibility

Both of these parameters depend of the temperature of the material,

### Total System Energy

The total system energy for a system with no magnetic, electrical, surface or other effects is defined as the sum of:

$$
    E = U + KE + PE
$$

where U is the internal energy.

We can express the specific internal energy as:

$$  
    u = U / m = u(T, \nu) = C_\nu dT + \left(\frac{\partial u}{\partial \nu} \right)_T \nu
$$

Where $C_\nu$ : Constant Volume specific heat

### Enthalpy

We define the enthalpy as:

$$
    H = U + PV
$$

Physically, it is the sum of internal energy and energy used to "make space" for the substance. Also, the specific enthalpy is:

$$
    h = H / m
$$

As such, h is both a function of pressure and temperature (*Just take derivate of $ U + PV $*). Also:

$$
    dh = c_p dT + \left(\frac{\partial h}{\partial p} \right)_T dp
$$
