/**
 * DO NOT CHANGE THIS FILE
 */

import { Route, Switch } from "react-router-dom";
import "./App.css";

import ProductFeatures from "./ComponentsToRefactor/ProductFeatures";
import RefactoredProductFeatures from "./Work/RefactoredProductFeatures";

import SignupForm from "./ComponentsToRefactor/SignupForm";
import RefactoredSignupForm from "./Work/RefactoredSignupForm";

import Values from "./ComponentsToRefactor/Values";
import RefactoredValues from "./Work/RefactoredValues";

import Promo from "./ComponentsToRefactor/Promo";
import RefactoredPromo from "./Work/RefactoredPromo";

import IndexPage from "./IndexPage";

const PromoDetails = {
  headline: "Summer produce has just arrived",
  description:
    " Do not miss out on our wide selection of organic and sustainably grown summer produce.",
  images: [
    "https://the-software-guild.s3.amazonaws.com/react/v2107/reactRefactorComponents05.jpg",
    "https://the-software-guild.s3.amazonaws.com/react/v2107/reactRefactorComponents06.jpg",
    "https://the-software-guild.s3.amazonaws.com/react/v2107/reactRefactorComponents07.jpg",
    "https://the-software-guild.s3.amazonaws.com/react/v2107/reactRefactorComponents08.jpg",
    "https://the-software-guild.s3.amazonaws.com/react/v2107/reactRefactorComponents09.jpg",
    "https://the-software-guild.s3.amazonaws.com/react/v2107/reactRefactorComponents10.jpg",
    "https://the-software-guild.s3.amazonaws.com/react/v2107/reactRefactorComponents11.jpg",
  ],
  callToAction: "Shop Fresh Produce",
};

function App() {
  return (
    <>
      <Switch>
        <Route path="/products/:id">
          <ProductFeatures />
        </Route>
        <Route
          path="/refactoredproducts/:id"
          component={RefactoredProductFeatures}
        />

        <Route path="/register">
          <SignupForm />
        </Route>
        <Route path="/refactoredRegister">
          <RefactoredSignupForm />
        </Route>

        <Route path="/values">
          <Values />
        </Route>
        <Route path="/refactoredValues">
          <RefactoredValues />
        </Route>

        <Route path="/promo">
          <Promo
            headline={PromoDetails.headline}
            description={PromoDetails.description}
            images={PromoDetails.images}
            callToAction={PromoDetails.callToAction}
          />
        </Route>
        <Route path="/refactoredPromo">
          <RefactoredPromo
            headline={PromoDetails.headline}
            description={PromoDetails.description}
            images={PromoDetails.images}
            callToAction={PromoDetails.callToAction}
          />
        </Route>

        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
