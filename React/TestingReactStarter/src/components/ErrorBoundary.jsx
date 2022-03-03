import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2>
          Sorry! There seems to be an error with this contact.{" "}
          <Link to="/" className="text-bold text-blue-400">
            Click here
          </Link>
          to go back to the home page
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
