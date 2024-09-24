class CartService {
  private static CART_KEY = "@food_explorer/cart";
  // Adiciona um item ao carrinho
  public static addToCart(productId: string): void {
    const cart = this.getCartItems();
    cart.push(productId);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }
  public static addMultiplesToCart(productId: string, amount: number): void {
    const cart = this.getCartItems();
    for (let i = 0; i < amount; i++) {
      cart.push(productId);
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }
  }

  public static removeMultiplesFromCart(
    productId: string,
    amount: number
  ): void {
    let cart = this.getCartItems(); // Obtém os itens do carrinho do localStorage
    for (let i = 0; i < amount; i++) {
      const index = cart.indexOf(productId); // Encontra o índice do productId no array
      if (index !== -1) {
        // Se o productId existir no carrinho (index !== -1)
        cart.splice(index, 1); // Remove o item do array
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart)); // Atualiza o localStorage com o novo array do carrinho
      }
    }
  }
  // Retorna todos os itens do carrinho
  public static getCartItems(): string[] {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }
  // Retorna o número de vezes que um produto específico foi adicionado ao carrinho
  public static getProductCount(productId: string): number {
    const cart = this.getCartItems();
    return cart.filter((id) => id === productId).length;
  }
  public static removeFromCart(productId: string): void {
    let cart = this.getCartItems(); // Obtém os itens do carrinho do localStorage
    const index = cart.indexOf(productId); // Encontra o índice do productId no array

    if (index !== -1) {
      // Se o productId existir no carrinho (index !== -1)
      cart.splice(index, 1); // Remove o item do array
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart)); // Atualiza o localStorage com o novo array do carrinho
    }
  }
  // Limpa todos os itens do carrinho
  public static clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  }
}
