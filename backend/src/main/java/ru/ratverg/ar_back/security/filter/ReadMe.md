## Compare JWT token and SESSION authorization

**JsonUsernamePasswordAuthenticationFilter flow**
```java


- Client sends POST /login with username + password
- JsonUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter extents AbstractAuthenticationProcessingFilter
    (this executes AbstractAuthenticationProcessingFilter.doFilter in inherited method of AbstractAuthenticationProcessingFilter)
        
- This .doFilter EXECUTES following method inside:

UsernamePasswordAuthenticationFilter.attemptAuthentication()
    - create UsernamePasswordAuthenticationToken (rawUsername, rawPassword)
       (request comes from front. Token is "row", only rawUsername and rawPassword!!!)
    - AuthenticationManager.authenticate(token)
       (gets AuthProvider and send this "row" token)
    - AuthenticationProvider checks DB
       (loads User from DB userDetailService.loadUserByUsername(username))
    - verifies encoded password
       (by passwordEncoder.matches(rawPassword, dbPassword) bd pass is bycrypt encoded!!!!)
    - returns authenticated UsernamePasswordAuthenticationToken
       (new REAL token authResult will be created with new UsernamePasswordAuthenticationToken(userDetails, null, authorities))

- JsonUsernamePasswordAuthenticationFilter.UsernamePasswordAuthenticationFilter.AbstractAuthenticationProcessingFilter.successfulAuthentication()
        (this method do SecurityContextHolder.getContext().setAuthentication(authResult))
        (--- now USER is logged in---)
-----------------------------------------------------------------
- NOW we have our (authResult token) storen in SecurityContext STREAM
- How do entire filter chain works?
        - SecurityContextPersistenceFilter (first time) - it runs two times, yes
            (right after request is done, it loads context from session)
        - SecurityContextPersistenceFilter (second time)
            (after request finished, it does request.getSession(true)
            this creates NEW SESSION using tomcat or using existing one)
- Who creates JSESSION?
        - TOMCAT generates random number and stores it in cookies Cookie: JSESSIONID=ABCD1234
        - browser stores it
        - browser sends in in all next requests Cookie: JSESSIONID=ABCD1234
--------------------------------------------------------------------
- So then, when we already HAVE SESSION, what heppenned after request?
    GET /api/data + JSESSIONID
    |
    SecurityContextPersistenceFilter (just passed, only works with hAntPathRequestMatcher("/login", "POST")) ✅
    |
    Authorization filters 
    |
    Controller ()

```
----------------------------------------------------------------------
**JWT Filter flow**

```sql
Client sends request with Authorization: Bearer <JWT>

doFilterInternal()
   ├─ read JWT from Authorization header
   ├─ validate token (signature + expiration)
   ├─ if valid:
   │      create UsernamePasswordAuthenticationToken(principal = payload,
   │                                                 authorities = payload.getAuthorities(),
   │                                                 credentials = null)
   └─ SecurityContextHolder.setAuthentication(auth)

```