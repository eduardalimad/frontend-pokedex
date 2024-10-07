<template>
    <div class="pokemon"></div>
  </template>
  
  <style lang="scss" scoped>
  $color-primary: rgb(254, 0, 1);
  $color-background: white;
  $border-color: black;
  $pokemon-size: 90px;
  $border-width: 5px;
  
  .pokemon {
    position: relative;
    height: $pokemon-size;
    width: $pokemon-size;
    background: linear-gradient(to bottom, $color-primary 50%, $color-background 50%);
    border-radius: 50%;
    border: $border-width solid $border-color;
    animation: spin 1s linear infinite;
  
    &::before {
      content: '';
      position: absolute;
      height: $border-width;
      width: $pokemon-size;
      background: $border-color;
      top: 50%;
      transform: translateY(-50%);
    }
  
    &::after {
      content: '';
      position: absolute;
      height: 38px;
      width: 38px;
      border-radius: 50%;
      background: $color-background;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0 0 0 ($border-width - 2) $border-color,
                  inset 0 0 0 ($border-width + 2) $color-background,
                  inset 0 0 0 ($border-width + 4) $border-color;
    }
  }
  
  /* Spin Animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  