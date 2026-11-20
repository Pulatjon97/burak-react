import React, { useState } from "react";
import { Box, Button, IconButton, Badge, Menu, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  CartItem,
  changeCartItemQuantity,
  removeCartItem,
} from "../../../lib/data/cart";
import { serverApi } from "../../../lib/config";

interface BasketProps {
  cartItems: CartItem[];
}
 
export default function Basket(props: BasketProps) {
  const { cartItems } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box className="hover-line">
      <IconButton
        aria-label={`Shopping basket, ${itemCount} items`}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={itemCount} color="secondary">
          <img src="/icons/shopping-cart.svg" alt="" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className="basket-frame">
          <Box className="all-check-box">
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <div>Cart Products:</div>
            )}
          </Box>

          {cartItems.length > 0 && (
            <Box className="orders-main-wrapper">
              <Box className="orders-wrapper">
                {cartItems.map((item: CartItem) => {
                  const imagePath = item.image.startsWith("http")
                    ? item.image
                    : `${serverApi}/${item.image.replace(/^\/+/, "")}`;

                  return (
                    <Box className="basket-info-box" key={item.id}>
                      <button
                        type="button"
                        className="cancel-btn"
                        aria-label={`Remove ${item.name} from basket`}
                        onClick={() => removeCartItem(item.id)}
                      >
                        <CancelIcon color="primary" fontSize="small" />
                      </button>
                      <img className="product-img" src={imagePath} alt={item.name} />
                      <span className="product-name">{item.name}</span>
                      <p className="product-price">
                        ${item.price} × {item.quantity}
                      </p>
                      <Box sx={{ minWidth: 120 }}>
                        <div className="col-2">
                          <button
                            type="button"
                            className="remove"
                            aria-label={`Remove one ${item.name}`}
                            onClick={() => changeCartItemQuantity(item.id, -1)}
                          >
                            −
                          </button>
                          <button
                            type="button"
                            className="add"
                            aria-label={`Add one ${item.name}`}
                            onClick={() => changeCartItemQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}

          {cartItems.length > 0 && (
            <Box className="basket-order">
              <span className="price">Total: ${total.toFixed(2)}</span>
              <Button startIcon={<ShoppingCartIcon />} variant="contained">
                Order
              </Button>
            </Box>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
