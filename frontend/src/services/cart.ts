import { toast } from "react-toastify";

interface CartItem {
  id: string;
  amount: number;
  name: string;
}

type CartMap = Map<string, CartItem>; // id - id, amount. name

class CartService {
  private static CART_KEY = "@food_explorer/cart";
  // Adiciona um item ao carrinho
  public static addMultiplesToCart({
    productId,
    amount,
    name,
  }: {
    productId: string;
    amount: number;
    name: string;
  }): void {
    const cart: CartMap = this.getCartItems() || new Map();
    console.log("0: ", cart);
    const cartItem = this.getCartItem(productId);
    console.log("1: ", cartItem);

    if (!cartItem) {
      cart.set(productId, { id: productId, amount, name });
      localStorage.setItem(this.CART_KEY, JSON.stringify([...cart]));
      toast.success(`${name} adicionado ${amount}`);
    } else if (!!cartItem && cartItem.amount + amount < 99) {
      cart.set(productId, {
        id: productId,
        amount: cartItem.amount + amount,
        name,
      });
      localStorage.setItem(this.CART_KEY, JSON.stringify([...cart]));
      toast.success(`${cartItem.name} adicionado ${amount}`);
    } else {
      toast.warning(`${cartItem.name} adicionado 99x`);
    }
  }
  public static getCartItems(): CartMap {
    const cartJson = localStorage.getItem(this.CART_KEY);
    const cart: CartMap = cartJson ? new Map(JSON.parse(cartJson)) : new Map();
    return cart;
  }
  public static getCartItem(productId: string): CartItem | null {
    const cart = this.getCartItems();
    if (!!cart) return cart.get(productId) || null;
    return null;
  }
  // Retorna o número de vezes que um produto específico foi adicionado ao carrinho
  public static getProductAmount(productId: string): number {
    const cart = this.getCartItems();
    const amount = cart.get(productId)?.amount;
    return amount || 0;
  }
  public static clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  }
  public static removeFromCart(productId: string): void {
    const cart: CartMap = this.getCartItems() || new Map();
    const cartItem = this.getCartItem(productId);
    if (!!cartItem) {
      if (cartItem.amount > 0) {
        cart.set(productId, {
          id: productId,
          amount: cartItem.amount - 1,
          name: cartItem.name,
        });
        toast.success(`1x ${cartItem.name} remomvido`);
      } else {
        cart.delete(productId);
      }
      localStorage.setItem(this.CART_KEY, JSON.stringify([...cart]));
    }
  }
}
export default CartService;
