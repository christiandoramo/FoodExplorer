import React, { useState } from "react";
import {
  Container,
  SearchBar,
  SearchInput,
  OrdersButton,
  NoBackgroundButton,
  Menu,
  IconButton,
  Overlay,
} from "./styles";
import { Hexagon } from "@phosphor-icons/react/dist/icons/Hexagon";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/icons/MagnifyingGlass";
import { SignOut } from "@phosphor-icons/react/dist/icons/SignOut";
import { USER_ROLES } from "../../enums/users";
import { Logo } from "../logo";
import { useAuth } from "../../contexts/auth";
import { List, Receipt, X } from "@phosphor-icons/react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";
import { productService } from "../../services/products";

export const Navbar: React.FC<any> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState<string>(
    location?.state?.searchTerm || ""
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

  const isMobile = useMediaQuery({
    query: "(max-width: 768px), (pointer: coarse)",
  }); // detectando se é celular - se a tela é até 768 ou se o ponteiro é touchscreen

  const { signOut, user } = useAuth();

  const handleSearch = async () => {
    const foundProducts = await productService.getProductsBySlug({
      slug: searchTerm,
    });
    nav("/", { state: { products: foundProducts, searchTerm } }); // jogando no state da rota em useLocation
  };

  const handleExpandInput = () => {
    setIsExpanded(true);
  };

  const handleBlurInput = () => {
    setIsExpanded(false);
  };

  const handleGotoOrders = () => {
    // admin vê todos os pedidos (concluidos incluso)
    // usuario comum vê seus pedidos apenas em andamento
  };
  const handleGotoFavorites = () => {
    // admin vê todos os favoritos
    // usuario comum vê seus favoritos
  };
  const handleGotoNewDish = () => {
    nav("/product-create");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const renderMenuContent = () => (
    <>
      <SearchBar
        className="bg-dark-900"
        onMouseEnter={handleExpandInput}
        onMouseLeave={() => {
          if (!searchTerm) handleBlurInput();
        }}
      >
        <MagnifyingGlass
          size={20}
          className={"text-light-400"}
          cursor={!!searchTerm ? "pointer" : "auto"}
          onClick={() => handleSearch()}
        />
        <SearchInput
          expanded={isExpanded || !!searchTerm}
          placeholder={"Busque por pratos ou ingredientes"}
          className={"text-light-100"}
          onBlur={() => {
            if (!searchTerm) handleBlurInput();
          }}
          onClick={handleExpandInput}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter") await handleSearch();
          }}
        />
      </SearchBar>
      <NoBackgroundButton
        className="medium-100 text-light-100"
        onClick={handleGotoFavorites}
      >
        {user?.role === USER_ROLES.DEFAULT ? `Meus favoritos` : `Favoritos`}
      </NoBackgroundButton>
      <NoBackgroundButton
        className="medium-100 text-light-100"
        onClick={
          user?.role === USER_ROLES.DEFAULT
            ? handleGotoOrders
            : handleGotoNewDish
        }
      >
        {user?.role === USER_ROLES.DEFAULT
          ? `Histórico de pedidos`
          : `Novo prato`}
      </NoBackgroundButton>
      <OrdersButton
        onClick={handleGotoOrders}
        className="medium-100 text-light-100 bg-tints-tomato-100"
      >
        <Receipt size={22} />
        {` Pedidos (${0})`}
      </OrdersButton>

      <SignOut
        onClick={signOut}
        display={"block"}
        size={48}
        className="text-light-100"
        cursor={"pointer"}
      />
    </>
  );

  return (
    <>
      <Container className="bg-dark-600">
        {isMobile && (
          <IconButton
            isOpen={menuOpen}
            className="medium-100 text-light-100"
            onClick={toggleMenu}
          >
            <List size={32} />
          </IconButton>
        )}
        <Logo user={user}>
          <div className="logo-image">
            <Hexagon weight="fill" size={30} className="text-tints-cake-100" />
          </div>
          <div className="logo-text">
            <div className="roboto bigger-bold text-light-100">
              food explorer
            </div>
            {user?.role === USER_ROLES.ADMIN && (
              <div className="roboto smallest-regular text-tints-cake-200 admin">
                admin
              </div>
            )}
          </div>
        </Logo>

        {!isMobile && <>{renderMenuContent()}</>}

        {isMobile && (
          <>
            <IconButton isOpen={menuOpen} onClick={handleGotoOrders}>
              <Receipt size={32} />
            </IconButton>
            {menuOpen && (
              <Overlay isOpen={menuOpen}>
                <Menu isOpen={menuOpen} className="bg-home">
                  <X size={32} color="white" onClick={toggleMenu} />
                  {renderMenuContent()}
                </Menu>
              </Overlay>
            )}
          </>
        )}
      </Container>
    </>
  );
};
