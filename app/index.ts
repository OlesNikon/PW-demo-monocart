import { PageHolder } from './abstractClasses';
import { CartPage } from './pages/cart.page';
import { LoginPage } from './pages/login.page';
import { ProductsPage } from './pages/products.page';

export class Application extends PageHolder {
  public login = new LoginPage(this.page);
  public products = new ProductsPage(this.page);
  public cart = new CartPage(this.page);
}
