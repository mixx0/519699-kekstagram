'use strict';

(function () {
  var hashTagInput = document.querySelector('.upload-form-hashtags');
  var commentTextarea = window.modal.formUpload.querySelector('.upload-form-description');

  var HashtagError = {
    maxLength: 'Максимальная длина одного хэштега не более 20-ти символов',
    count: 'Нельзя использовать больше 5ти хэштегов',
    copy: 'Хэштеги повторяются',
    type: 'Хэштег начинается с символа #',
    hyphen: 'Нельзя более одного дефиса подряд'
  };

  var HashtagValidity = {
    MAX_COUNT: 5,
    MAX_LENGTH: 20
  };

  var onBtnCheckValidityHashtagClick = function () {
    var value = hashTagInput.value.toLowerCase().trim();
    var parts = value.split(' ');

    if (parts.length > HashtagValidity.MAX_COUNT) {
      hashTagInput.setCustomValidity(HashtagError.count);

      return false;
    }

    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > HashtagValidity.MAX_LENGTH) {
        hashTagInput.setCustomValidity(HashtagError.maxLength);

        return false;
      }

      if (value !== '' && parts[i].charAt(0) !== '#') {
        hashTagInput.setCustomValidity(HashtagError.type);

        return false;
      }

      var repeated = parts.filter(function (item) {
        return item === parts[i];
      });

      if (repeated.length > 1) {
        hashTagInput.setCustomValidity(HashtagError.copy);

        return false;
      }

      hashTagInput.setCustomValidity('');
    }

    return true;
  };

  var onPreventDefaultCommentEscPress = function (evt) {
    window.util.isEscPressEvent(evt, function () {

      evt.stopPropagation();
    });
  };

  hashTagInput.addEventListener('input', function () {
    onBtnCheckValidityHashtagClick();
  });

  commentTextarea.addEventListener('keydown', onPreventDefaultCommentEscPress);
})();