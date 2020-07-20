import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setPageSize, setSortProperty } from "../ActionCreators";

const mapStateToProps = (dataStore) => dataStore;
const mapDispatchToProps = { setPageSize, setSortProperty };

const mergeProps = (dataStore, actionCreators, router) => ({
  ...dataStore,
  ...router,
  ...actionCreators,
  currentPage: Number(router.match.params.page),
  //  Math.ceil : 입력한 값 보다 큰수를 줄거나 작은수 를 주는 함수
  pageCount: Math.ceil(
    (dataStore.products_total | dataStore.pageSize || 5) /
      (dataStore.pageSize || 5)
  ),
  navigateToPage: (page) =>
    router.history.push(
      `/shop/products/${router.match.params.category}/${page}`
    ),
});

export const ProductPageConnector = (PageComponent) =>
  withRouter(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(PageComponent)
  );
