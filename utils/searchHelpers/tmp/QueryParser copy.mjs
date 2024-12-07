class QueryParser {
  static range(fieldName, filterValue) {
    let minValue, maxValue
    if (filterValue.includes('-'))
      [minValue, maxValue] = filterValue.split('-').map(parseFloat)
    else {
      if (!Array.isArray(filterValue)) {
        filterValue = [filterValue]
      }
      filterValue.forEach((val) => {
        if (val.startsWith('gte:')) minValue = parseFloat(val.slice(4))
        if (val.startsWith('lte:')) maxValue = parseFloat(val.slice(4))
      })
    }

    const filtersContent = []
    if (!isNaN(minValue)) {
      filtersContent.push({
        fieldName,
        filterType: 'minValue',
        filterContent: minValue,
      })
    }
    if (!isNaN(maxValue)) {
      filtersContent.push({
        fieldName,
        filterType: 'maxValue',
        filterContent: maxValue,
      })
    }
    return filtersContent
  }

  static list(fieldName, filterValue) {
    return [
      {
        fieldName,
        filterType: 'in',
        filterContent: filterValue.split(','),
      },
    ]
  }

  static search(fieldName, filterValue) {
    return [
      {
        fieldName,
        filterType: 'search',
        filterContent: filterValue,
      },
    ]
  }

  //-------
  static filtersParser(fieldsConfigurations, query) {
    const filters = []
    fieldsConfigurations.forEach(({ fieldName, filterCategory }) => {
      if (query[fieldName])
        filters.push(...this[filterCategory](fieldName, query[fieldName]))
    })

    return filters
  }
  // Парсимо дії
  static actionsParser(query) {
    const actions = []
    if (query.sort) {
      const [field, order] = query.sort.split(':')
      actions.push({ type: 'sort', field, order: order === 'desc' ? -1 : 1 })
    }
    if (query.page && query.perPage) {
      actions.push({ type: 'skip', value: query.page * query.perPage })
      actions.push({ type: 'limit', value: parseInt(query.perPage) })
    }
    return actions
  }
  static parseQuery(query, fieldsConfigurations) {
    const filters = this.filtersParser(fieldsConfigurations, query)
    const actions = this.actionsParser(query)
    return { filters, actions }
  }
}
export default QueryParser
