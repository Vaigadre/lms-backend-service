import * as _ from 'lodash';

import {
  AnyObject,
  QueryOptions,
  Sort
} from '../types/query-options.interface';

const defaultSortOrder = 1;

export function generateOptions(resQuery: any) {
  const options: QueryOptions = { sort: { createdAt: defaultSortOrder } };
  if (resQuery.limit) {
    options.limit = resQuery.limit;
  }
  if (resQuery.skip) {
    options.skip = resQuery.skip;
  }

  if (!_.isEmpty(resQuery.sort)) {
    /* Remove default order */
    const sort: Sort = {};
    if (resQuery.sort.indexOf('-') === 0) {
      sort[resQuery.sort.substring(1)] = -1;
    } else {
      sort[resQuery.sort] = defaultSortOrder;
    }
    options.sort = sort;
  }

  return options;
}

export function generateProjection(resQuery: any) {
  let projection: Sort = {};
  if (resQuery.select) {
    let selectList = resQuery.select;
    if (typeof selectList === 'string') {
      selectList = selectList.split(',');
    }
    if (Array.isArray(selectList)) {
      for (const selected of selectList) {
        projection[selected] = 1;
      }
    } else if (typeof selectList === 'object') {
      projection = resQuery.select;
    }
  } else if (resQuery.unselect) {
    let unselectList = resQuery.unselect;
    if (typeof unselectList === 'string') {
      unselectList = unselectList.split(',');
    }
    if (Array.isArray(unselectList)) {
      for (const unselected of unselectList) {
        projection[unselected] = 0;
      }
    } else if (typeof unselectList === 'string') {
      projection[resQuery.unselect] = 0;
    } else if (typeof unselectList === 'object') {
      projection = resQuery.unselect;
    }
  }
  return projection;
}

export function generateCondition(resQuery: any, filterFields: any) {
  const query: AnyObject = {};

  filterFields.forEach((field: string) => {
    if (resQuery[field]) {
      query[field] = resQuery[field];
    }
  });

  return query;
}

export function generateQuery(resQuery: any, filterFields: any) {
  return {
    condition: generateCondition(resQuery, filterFields),
    projection: generateProjection(resQuery),
    options: generateOptions(resQuery)
  };
}
