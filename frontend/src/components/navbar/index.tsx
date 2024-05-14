import React, { useState } from "react";
import {
  Logo,
  Container,
  SearchBar,
  SearchInput,
  NewDishButton,
} from "./styles";
import { Hexagon } from "@phosphor-icons/react/dist/icons/Hexagon";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/icons/MagnifyingGlass";
import { SignOut } from "@phosphor-icons/react/dist/icons/SignOut";

export const Navbar: React.FC<any> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleExpandInput = () => {
    setIsExpanded(true);
  };

  const handleBlurInput = () => {
    setIsExpanded(false);
  };

  return (
    <Container className="bg-dark-600">
      <Logo>
        <div className="logo-image">
          <Hexagon weight="fill" size={30} className="text-tints-cake-100" />
        </div>
        <div className="logo-text">
          <div className="roboto bigger-bold text-light-100">food explorer</div>
          <div className="roboto smallest-regular text-tints-cake-200 admin">
            admin
          </div>
        </div>
      </Logo>
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
        />
      </SearchBar>
      <NewDishButton className="medium-100 text-light-100 bg-tints-tomato-100">
        Novo prato
      </NewDishButton>
      <SignOut size={32} className="text-light-100" cursor={"pointer"} />
    </Container>
  );
};
