import {
    FunctionResult,
    DiscountApplicationType,
  } from '@shopify/functions';
  
  export default (input, { cart }) => {
    // Verifica si algún producto tiene un descuento mayor al 15%
    const hasHighDiscount = cart.lines.some(line => {
      const originalPrice = line.merchandise.price.original;
      const discountedPrice = line.cost.totalAmount.amount;
      const discountPercentage =
        ((originalPrice - discountedPrice) / originalPrice) * 100;
        console.log(discountPercentage);
      return discountPercentage > 15;
    });
  
    if (hasHighDiscount) {
      // Si hay un descuento mayor al 15%, elimina los cupones
      return new FunctionResult({
        discountApplicationRemovals: cart.discountApplications.map(
          app => ({
            type: DiscountApplicationType.CUSTOMER,
            code: app.code,
          })
        ),
      });
    }
  
    // Si no hay descuentos mayores al 15%, no realizar cambios
    return new FunctionResult({});
  };
  