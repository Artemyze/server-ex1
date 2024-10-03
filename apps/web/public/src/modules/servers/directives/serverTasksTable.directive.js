const serverTasksTable = [
  '$compile', 'dataTableLanguage', function($compile, dataTableLanguage) {
    return {
      restrict: 'A',
      scope: {
        'onDraw': '&',
        'filter': '<',
        'serverId': '<',
      },
      link: function(scope, element) {
        const dt = element.DataTable({ // eslint-disable-line new-cap
          ordering: false,
          searching: true,
          processing: true,
          serverSide: true,
          language: dataTableLanguage,
          ajax: '/tasks/list/' + scope.serverId,
          columns: [
            {
              data: 'date',
            },
            {
              data: 'name',
            },
            {
              data: 'completeDuration',
            },
            {
              data: 'isComplete',
              render: function(row, data, full) {
                return full.isComplete? 'Да': 'Нет';
              },
            },
          ],
          order: [[0, 'desc']],
          createdRow: function(row, data) {
            const localScope = scope.$new(true);
            localScope.data = data;
            $compile(angular.element(row).contents())(localScope);
          },
        });
        dt.columns().every(function() {
          const that = this;
          $('input', this.header()).on('change', function() {
            if (that.search() !== $(this).val()) {
              that.search($(this).val(), false, false).draw();
            }
          });
          $('select', this.header()).on('change', function() {
            if (that.search() !== $(this).val()) {
              that.search($(this).val()).draw();
            }
          });
        });
        dt.on('draw', function() {
          scope.onDraw({params: dt.ajax.params()});
        });
      },
    };
  }];

export {serverTasksTable};
