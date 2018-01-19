angular.module('s3Module')
    .factory('s3Service', function ($http, keyService) {
        var service = {};
        const BUCKET_NAME = 'autoadivisor';
        const BUCKET_REGION = 'US East (N. Virginia)';

        AWS.config.update({
            region: BUCKET_REGION
        });

        var s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: { Bucket: BUCKET_NAME }
        });

        service.index = function () {
            s2.listObjects({ Delimiter: '/' }, function (err, data) {
                if (err) {
                    return alert('There was an error listing your albums: ' + err.message);
                }
                else {
                    var albums = data.CommonPrefixes.map(function (commonPrefix) {
                        var prefix = commonPrefix.Prefix;
                        var albumName = decodeURIComponent(prefix.replace('/', ''));
                    });
                }
            });
        }
        service.create = function (albumName) {
            albumName = albumName.trim();
            if (!albumName) {
                return alert('Album names must contain at least one non-space character.');
            }
            if (albumName.indexOf('/') !== -1) {
                return alert('Album names cannot contain slashes.');
            }
            var albumKey = encodeURIComponent(albumName) + '/';
            s3.headObject({ Key: albumKey }, function (err, data) {
                if (!err) {
                    return alert('Album already exists.');
                }
                if (err.code !== 'NotFound') {
                    return alert('There was an error creating your album: ' + err.message);
                }
                s3.putObject({ Key: albumKey }, function (err, data) {
                    if (err) {
                        return alert('There was an error creating your album: ' + err.message);
                    }
                    alert('Successfully created album.');
                    viewAlbum(albumName);
                });
            });
        }

        service.listPhotos = function(albumName) {
            var albumPhotosKey = encodeURIComponent(albumName) + '/';
            s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
                if (err) {
                    return alert('There was an error viewing your album: ' + err.message);
                }
                // `this` references the AWS.Response instance that represents the response
                var href = this.request.httpRequest.endpoint.href;
                var bucketUrl = href + albumBucketName + '/';
          
                var photos = data.Contents.map(function (photo) {
                    var photoKey = photo.Key;
                    var photoUrl = bucketUrl + encodeURIComponent(photoKey);
                }); 
            })
        }
        service.addPhoto = function(albumName) {
            var files = document.getElementById('photoupload').files;
            if (!files.length) {
              return alert('Please choose a file to upload first.');
            }
            var file = files[0];
            var fileName = file.name;
            var albumPhotosKey = encodeURIComponent(albumName) + '//';
          
            var photoKey = albumPhotosKey + fileName;
            s3.upload({
              Key: photoKey,
              Body: file,
              ACL: 'public-read'
            }, function(err, data) {
              if (err) {
                return alert('There was an error uploading your photo: ', err.message);
              }
              alert('Successfully uploaded photo.');
              viewAlbum(albumName);
            });
        }
        service.deletePhoto = function (albumName, photoKey) {
                s3.deleteObject({Key: photoKey}, function(err, data) {
                  if (err) {
                    return alert('There was an error deleting your photo: ', err.message);
                  }
                  alert('Successfully deleted photo.');
                  viewAlbum(albumName);
                });
        }
        return service;
    }); 