'use strict';

angular.module('trendrr').factory('postService', function postService($rootScope, $q, $firebaseObject, $firebaseArray){

    var FBURL = "https://blockchain-215cc.firebaseio.com";
    var companySubmitted = {
        submitted: false
    };
    var selectedCompany = {};

    return {
        getList: function () {
            var ref = firebase.database().ref().child('education-posts');
            // download the data into a local object
            return $firebaseObject(ref);
        },
        getUsers: function () {
            var ref = firebase.database().ref().child('users');
            return $firebaseObject(ref);
        },
        getEductionPosts: function(){
            var ref = firebase.database().ref().child('education-posts');
            var usersCollection = $firebaseArray(ref);
            var query = usersCollection.$ref().orderByChild('approved').equalTo(true);
            return $firebaseArray(query);
        },
        setSelectedPost: function(post){
            angular.copy(post, selectedCompany);
        },
        getSelectedCompany: selectedCompany,
        getAllEducationPosts: function(){
            var ref = firebase.database().ref().child('education-posts');
            return $firebaseArray(ref);
        },
        getPendingEducationPosts: function(){
            var ref = firebase.database().ref().child('education-posts');
            var usersCollection = $firebaseArray(ref);
            var query = usersCollection.$ref().orderByChild('approved').equalTo(false);
            return $firebaseArray(query);
        },



        getInvestingPosts: function(){
            var ref = firebase.database().ref().child('investing-posts');
            var usersCollection = $firebaseArray(ref);
            var query = usersCollection.$ref().orderByChild('approved').equalTo(true);
            return $firebaseArray(query);
        },
        getAllInvestingPosts: function(){
            var ref = firebase.database().ref().child('investing-posts');
            return $firebaseArray(ref);
        },
        getPendingInvestingPosts: function(){
            var ref = firebase.database().ref().child('investing-posts');
            var usersCollection = $firebaseArray(ref);
            var query = usersCollection.$ref().orderByChild('approved').equalTo(false);
            return $firebaseArray(query);
        },




        getComingSoonPosts: function(){
            var ref = firebase.database().ref().child('coming-soon-posts');
            var usersCollection = $firebaseArray(ref);
            var query = usersCollection.$ref().orderByChild('approved').equalTo(true);
            return $firebaseArray(query);
        },
        getAllComingSoonPosts: function(){
            var ref = firebase.database().ref().child('coming-soon-posts');
            return $firebaseArray(ref);
        },
        getPendingComingSoonPosts: function(){
            var ref = firebase.database().ref().child('coming-soon-posts');
            var usersCollection = $firebaseArray(ref);
            var query = usersCollection.$ref().orderByChild('approved').equalTo(false);
            return $firebaseArray(query);
        },





        // saveNewCompany: function(company){
        //     var ref = firebase.database().ref().child('companies');
        //     var companies = $firebaseArray(ref);
        //     var company = {
        //         "picture": authData.user.photoURL,
        //         "role": 'user',
        //         "email": authData.user.email,
        //         "fullName": authData.user.providerData[0].displayName,
        //         "uid": authData.user.uid,
        //         "dateCreated": Date.now(),
        //         "lastLogin": Date.now()
        //     };
        //
        //     users.$save().then(function() {
        //         setUserData(user);
        //         resolveLogin(authData);
        //     });
        // },
        incrementCompanyVote: function (companyId, count) {
            var ref = firebase.database().ref().child('education-posts').child(companyId);
            $firebaseObject(ref).$loaded(function (company) {
                if(company.totalVotes){
                    company.totalVotes+= count;
                } else{
                    company.totalVotes = count;
                }
                company.$save();
            });
        },
        incrementFacebookShare: function (companyId, userId) {
			var sharesRef = firebase.database().ref().child('facebookShares');
			var sharesCollection = $firebaseArray(sharesRef);
			var query = sharesCollection.$ref().orderByChild('userId').equalTo(userId);
			$firebaseArray(query).$loaded(function (shares) {
				var shared = false;
				for (var i = shares.length - 1; i >= 0; i--) {
					if(shares[i].companyId === companyId){
						shared = true;
					}
				}

				if(!shared) {
					var ref = firebase.database().ref().child('facebookShares');
					var shares = $firebaseArray(ref);
					var newShare = {
						companyId: companyId,
						userId: userId,
						dateCreated: Date.now()
					};
					shares.$add(newShare).then(function (result) {
                        var ref = firebase.database().ref().child('education-posts').child(companyId);
                        $firebaseObject(ref).$loaded(function (company) {
                            if(company.facebookShares){
                                company.facebookShares++;
                            } else{
                                company.facebookShares = 1;
                            }
                            company.$save();
							console.log('Share added');
                        });
					}).catch(function (err) {
						console.log('Unable to register', err);
					});
				} else{
					console.log('already voted');
				}
			});
        },
        incrementTwitterShare: function (companyId, userId) {
            var sharesRef = firebase.database().ref().child('twitterShares');
            var sharesCollection = $firebaseArray(sharesRef);
            var query = sharesCollection.$ref().orderByChild('userId').equalTo(userId);
            $firebaseArray(query).$loaded(function (shares) {
                var shared = false;
                for (var i = shares.length - 1; i >= 0; i--) {
                    if(shares[i].companyId === companyId){
                        shared = true;
                    }
                }

                if(!shared) {
                    var ref = firebase.database().ref().child('twitterShares');
                    var shares = $firebaseArray(ref);
                    var newShare = {
                        companyId: companyId,
                        userId: userId,
                        dateCreated: Date.now()
                    };
                    shares.$add(newShare).then(function (result) {
                        var ref = firebase.database().ref().child('education-posts').child(companyId);
                        $firebaseObject(ref).$loaded(function (company) {
                            if(company.twitterShares){
                                company.twitterShares++;
                            } else{
                                company.twitterShares = 1;
                            }
                            company.$save();
                            console.log('Share added');
                        });
                    }).catch(function (err) {
                        console.log('Unable to register', err);
                    });
                } else{
                    console.log('already voted');
                }
            });
        },
        adjustVotesAndDonations: function (companyId, amount) {
            var ref = firebase.database().ref().child('education-posts').child(companyId);
            $firebaseObject(ref).$loaded(function (company) {
                // company.totalVotes += parseInt(amount);
                company.totalDonated += parseInt(amount);
                company.$save();
            });
        },
        approveCompany: function (companyId) {
            var ref = firebase.database().ref().child('education-posts').child(companyId);
            $firebaseObject(ref).$loaded(function (company) {
                company.approved = true;
                company.$save();
            });
        },
        companySubmitted: function(state){
            angular.copy(state, companySubmitted);
        },
        getCompanySubmitted: companySubmitted,
        loginPrompt: function(){
            $('body').toggleClass('modal-open-up');
            if (!$rootScope.loginDeferred) {
                $rootScope.loginDeferred=$q.defer();
            }
            return $rootScope.loginDeferred.promise;
        }
    };

});
