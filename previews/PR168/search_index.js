var documenterSearchIndex = {"docs":
[{"location":"#ClassicalOrthogonalPolynomials.jl","page":"Home","title":"ClassicalOrthogonalPolynomials.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A Julia package for classical orthogonal polynomials and expansions","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = ClassicalOrthogonalPolynomials","category":"page"},{"location":"#Definitions","page":"Home","title":"Definitions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"We follow the Digital Library of Mathematical Functions, which defines the following classical orthogonal polynomials:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Legendre: P_n(x)\nChebyshev (1st kind, 2nd kind): T_n(x), U_n(x)\nUltraspherical: C_n^{(λ)}(x)\nJacobi: P_n^{(a,b)}(x)\nLaguerre: L_n^{(α)}(x)\nHermite: H_n(x)","category":"page"},{"location":"#Evaluation","page":"Home","title":"Evaluation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The simplest usage of this package is to evaluate classical orthogonal polynomials:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using ClassicalOrthogonalPolynomials\nn, x = 5, 0.1;\nlegendrep(n, x) # P_n(x)\nchebyshevt(n, x) # T_n(x) == cos(n*acos(x))\nchebyshevu(n, x) # U_n(x) == sin((n+1)*acos(x))/sin(acos(x))\nλ = 0.3; ultrasphericalc(n, λ, x) # C_n^(λ)(x)\na,b = 0.1,0.2; jacobip(n, a, b, x) # P_n^(a,b)(x)\nlaguerrel(n, x) # L_n(x)\nα = 0.1; laguerrel(n, α, x) # L_n^(α)(x)\nhermiteh(n, x) # H_n(x)","category":"page"},{"location":"#Continuum-arrays","page":"Home","title":"Continuum arrays","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"For expansions, recurrence relationships, and other operations linked with linear equations, it is useful to treat the families of orthogonal  polynomials as continuum arrays, as implemented in ContinuumArrays.jl. The continuum arrays implementation is accessed as follows:","category":"page"},{"location":"","page":"Home","title":"Home","text":"T = ChebyshevT() # Or just Chebyshev()\naxes(T) # [-1,1] by 1:∞\nT[x, n+1] # T_n(x) = cos(n*acos(x))","category":"page"},{"location":"","page":"Home","title":"Home","text":"We can thereby access many points and indices efficiently using array-like language:","category":"page"},{"location":"","page":"Home","title":"Home","text":"x = range(-1, 1; length=1000);\nT[x, 1:1000] # [T_j(x[k]) for k=1:1000, j=0:999]","category":"page"},{"location":"#Expansions","page":"Home","title":"Expansions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"We view a function expansion in say Chebyshev polynomials in terms of continuum arrays as follows:","category":"page"},{"location":"","page":"Home","title":"Home","text":"f(x) = sum_k=0^ c_k T_k(x) = beginbmatrixT_0(x)  T_1(x)   endbmatrix \nbeginbmatrixc_0 c_1  vdots endbmatrix = Tx * 𝐜","category":"page"},{"location":"","page":"Home","title":"Home","text":"To be more precise, we think of functions as continuum-vectors. Here is a simple example:","category":"page"},{"location":"","page":"Home","title":"Home","text":"f = T * [1; 2; 3; zeros(∞)]; # T_0(x) + T_1(x) + T_2(x)\nf[0.1]","category":"page"},{"location":"","page":"Home","title":"Home","text":"To find the coefficients for a given function we consider this as the problem of finding 𝐜 such that T*𝐜 == f, that is:","category":"page"},{"location":"","page":"Home","title":"Home","text":"T \\ f","category":"page"},{"location":"","page":"Home","title":"Home","text":"For a function given only pointwise we broadcast over x, e.g., the following are the coefficients of \\exp(x):","category":"page"},{"location":"","page":"Home","title":"Home","text":"x = axes(T, 1);\nc = T \\ exp.(x)\nf = T*c; f[0.1] # ≈ exp(0.1)","category":"page"},{"location":"","page":"Home","title":"Home","text":"With a little cheeky usage of Julia's order-of-operations this can be written succicently as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"f = T / T \\ exp.(x);\nf[0.1]","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Or for more clarity just write T * (T \\ exp.(x)).)","category":"page"},{"location":"#Jacobi-matrices","page":"Home","title":"Jacobi matrices","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Orthogonal polynomials satisfy well-known three-term recurrences:","category":"page"},{"location":"","page":"Home","title":"Home","text":"x p_n(x) = c_n-1 p_n-1(x) + a_n p_n(x) + b_n p_n+1(x)","category":"page"},{"location":"","page":"Home","title":"Home","text":"In continuum-array language this has the  form of a comuting relationship:","category":"page"},{"location":"","page":"Home","title":"Home","text":"x beginbmatrix p_0  p_1  cdots endbmatrix = beginbmatrix p_0  p_1  cdots endbmatrix beginbmatrix a_0  c_0   b_0  a_1  c_1   b_1  a_2  ddots  ddots  ddots endbmatrix","category":"page"},{"location":"","page":"Home","title":"Home","text":"We can therefore find the Jacobi matrix naturally as follows:","category":"page"},{"location":"","page":"Home","title":"Home","text":"T \\ (x .* T)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Alternatively, just call jacobimatrix(T) (noting its the transpose of the more traditional convention).","category":"page"},{"location":"#Derivatives","page":"Home","title":"Derivatives","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The derivatives of classical orthogonal polynomials are also classical OPs, and this can be seen as follows:","category":"page"},{"location":"","page":"Home","title":"Home","text":"U = ChebyshevU();\nD = Derivative(x);\nU\\D*T","category":"page"},{"location":"","page":"Home","title":"Home","text":"Similarly, the derivative of weighted classical OPs are weighted classical OPs:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Weighted(T)\\D*Weighted(U)","category":"page"},{"location":"#Other-recurrence-relationships","page":"Home","title":"Other recurrence relationships","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Many other sparse recurrence relationships are implemented. Here's one:","category":"page"},{"location":"","page":"Home","title":"Home","text":"U\\T","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Probably best to ignore the type signature 😅)","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"#Polynomials","page":"Home","title":"Polynomials","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.Chebyshev","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.Chebyshev","page":"Home","title":"ClassicalOrthogonalPolynomials.Chebyshev","text":"Chebyshev{kind,T}()\n\nis a quasi-matrix representing Chebyshev polynomials of the specified kind (1, 2, 3, or 4) on -1..1.\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.chebyshevt","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.chebyshevt","page":"Home","title":"ClassicalOrthogonalPolynomials.chebyshevt","text":" chebyshevt(n, z)\n\ncomputes the n-th Chebyshev polynomial of the first kind at z.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.chebyshevu","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.chebyshevu","page":"Home","title":"ClassicalOrthogonalPolynomials.chebyshevu","text":" chebyshevt(n, z)\n\ncomputes the n-th Chebyshev polynomial of the second kind at z.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.legendrep","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.legendrep","page":"Home","title":"ClassicalOrthogonalPolynomials.legendrep","text":" legendrep(n, z)\n\ncomputes the n-th Legendre polynomial at z.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.jacobip","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.jacobip","page":"Home","title":"ClassicalOrthogonalPolynomials.jacobip","text":" jacobip(n, a, b, z)\n\ncomputes the n-th Jacobi polynomial, orthogonal with respec to (1-x)^a*(1+x)^b, at z.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.laguerrel","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.laguerrel","page":"Home","title":"ClassicalOrthogonalPolynomials.laguerrel","text":" laguerrel(n, α, z)\n\ncomputes the n-th generalized Laguerre polynomial, orthogonal with  respec to x^α * exp(-x), at z.\n\n\n\n\n\n laguerrel(n, z)\n\ncomputes the n-th Laguerre polynomial, orthogonal with  respec to exp(-x), at z.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.hermiteh","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.hermiteh","page":"Home","title":"ClassicalOrthogonalPolynomials.hermiteh","text":" hermiteh(n, z)\n\ncomputes the n-th Hermite polynomial, orthogonal with  respec to exp(-x^2), at z.\n\n\n\n\n\n","category":"function"},{"location":"#Weights","page":"Home","title":"Weights","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.OrthonormalWeighted","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.OrthonormalWeighted","page":"Home","title":"ClassicalOrthogonalPolynomials.OrthonormalWeighted","text":"OrthonormalWeighted(P)\n\nis the orthonormal with respect to L^2 basis given by sqrt.(orthogonalityweight(P)) .* Normalized(P).\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.HermiteWeight","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.HermiteWeight","page":"Home","title":"ClassicalOrthogonalPolynomials.HermiteWeight","text":"HermiteWeight()\n\nis a quasi-vector representing exp(-x^2) on ℝ.\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.Weighted","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.Weighted","page":"Home","title":"ClassicalOrthogonalPolynomials.Weighted","text":"Weighted(P)\n\nis equivalent to orthogonalityweight(P) .* P\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.ChebyshevWeight","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.ChebyshevWeight","page":"Home","title":"ClassicalOrthogonalPolynomials.ChebyshevWeight","text":"ChebyshevWeight{kind,T}()\n\nis a quasi-vector representing the Chebyshev weight of the specified kind on -1..1. That is, ChebyshevWeight{1}() represents 1/sqrt(1-x^2), and ChebyshevWeight{2}() represents sqrt(1-x^2).\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.LaguerreWeight","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.LaguerreWeight","page":"Home","title":"ClassicalOrthogonalPolynomials.LaguerreWeight","text":"LaguerreWeight(α)\n\nis a quasi-vector representing x^α * exp(-x) on 0..Inf.\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.HalfWeighted","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.HalfWeighted","page":"Home","title":"ClassicalOrthogonalPolynomials.HalfWeighted","text":"HalfWeighted{lr}(Jacobi(a,b))\n\nis equivalent to JacobiWeight(a,0) .* Jacobi(a,b) (lr = :a) or JacobiWeight(0,b) .* Jacobi(a,b) (lr = :b)\n\n\n\n\n\n","category":"type"},{"location":"#Recurrences","page":"Home","title":"Recurrences","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.normalizationconstant","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.normalizationconstant","page":"Home","title":"ClassicalOrthogonalPolynomials.normalizationconstant","text":"normalizationconstant\n\ngives the normalization constants so that the jacobi matrix is symmetric, that is, so we have orthonormal OPs:\n\nQ == P*normalizationconstant(P)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.OrthogonalPolynomialRatio","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.OrthogonalPolynomialRatio","page":"Home","title":"ClassicalOrthogonalPolynomials.OrthogonalPolynomialRatio","text":"OrthogonalPolynomialRatio(P,x)\n\nis a is equivalent to the vector P[x,:] ./ P[x,2:end]but built from the recurrence coefficients ofP`.\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.Clenshaw","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.Clenshaw","page":"Home","title":"ClassicalOrthogonalPolynomials.Clenshaw","text":"Clenshaw(a, X)\n\nrepresents the operator a(X) where a is a polynomial. Here a is to stored as a quasi-vector.\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.singularities","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.singularities","page":"Home","title":"ClassicalOrthogonalPolynomials.singularities","text":"singularities(f)\n\ngives the singularity structure of an expansion, e.g., JacobiWeight.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.jacobimatrix","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.jacobimatrix","page":"Home","title":"ClassicalOrthogonalPolynomials.jacobimatrix","text":"jacobimatrix(P)\n\nreturns the Jacobi matrix X associated to a quasi-matrix of orthogonal polynomials satisfying\n\nx = axes(P,1)\nx*P == P*X\n\nNote that X is the transpose of the usual definition of the Jacobi matrix.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.recurrencecoefficients","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.recurrencecoefficients","page":"Home","title":"ClassicalOrthogonalPolynomials.recurrencecoefficients","text":"recurrencecoefficients(P)\n\nreturns a (A,B,C) associated with the Orthogonal Polynomials P, satisfying for x in axes(P,1)\n\nP[x,2] == (A[1]*x + B[1])*P[x,1]\nP[x,n+1] == (A[n]*x + B[n])*P[x,n] - C[n]*P[x,n-1]\n\nNote that C[1]` is unused.\n\nThe relationship with the Jacobi matrix is:\n\n1/A[n] == X[n+1,n]\n-B[n]/A[n] == X[n,n]\nC[n+1]/A[n+1] == X[n,n+1]\n\n\n\n\n\n","category":"function"},{"location":"#Internal","page":"Home","title":"Internal","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.ShuffledIR2HC","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.ShuffledIR2HC","page":"Home","title":"ClassicalOrthogonalPolynomials.ShuffledIR2HC","text":"Gives a shuffled version of the real IFFT, with order 1,sin(θ),cos(θ),sin(2θ)…\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.ShuffledR2HC","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.ShuffledR2HC","page":"Home","title":"ClassicalOrthogonalPolynomials.ShuffledR2HC","text":"Gives a shuffled version of the real FFT, with order 1,sin(θ),cos(θ),sin(2θ)…\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.ShuffledIFFT","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.ShuffledIFFT","page":"Home","title":"ClassicalOrthogonalPolynomials.ShuffledIFFT","text":"Gives a shuffled version of the IFFT, with order 1,sin(θ),cos(θ),sin(2θ)…\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.qr_jacobimatrix","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.qr_jacobimatrix","page":"Home","title":"ClassicalOrthogonalPolynomials.qr_jacobimatrix","text":"qr_jacobimatrix(sqrtw, P)\n\nreturns the Jacobi matrix X associated to a quasi-matrix of polynomials orthogonal with respect to w(x) w_p(x) where w_p(x) is the weight of the polynomials in P by computing a QR decomposition of the square root weight modification.\n\nThe resulting polynomials are orthonormal on the same domain as P. The supplied P must be normalized. Accepted inputs for sqrtw are the square root of the weight modification as a function or sqrtW as an infinite matrix representing multiplication with the function sqrt(w) on the basis P.\n\nThe underlying QR approach allows two methods, one which uses the Q matrix and one which uses the R matrix. To change between methods, an optional argument :Q or :R may be supplied. The default is to use the Q method.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.MappedOPLayout","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.MappedOPLayout","page":"Home","title":"ClassicalOrthogonalPolynomials.MappedOPLayout","text":"MappedOPLayout\n\nrepresents an OP that is (usually affine) mapped OP\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.cholesky_jacobimatrix","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.cholesky_jacobimatrix","page":"Home","title":"ClassicalOrthogonalPolynomials.cholesky_jacobimatrix","text":"cholesky_jacobimatrix(w, P)\n\nreturns the Jacobi matrix X associated to a quasi-matrix of polynomials orthogonal with respect to w(x) w_p(x) where w_p(x) is the weight of the polynomials in P by computing a Cholesky decomposition of the weight modification.\n\nThe resulting polynomials are orthonormal on the same domain as P. The supplied P must be normalized. Accepted inputs are w as a function or W as an infinite matrix representing multiplication with the function w on the basis P.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.AbstractNormalizedOPLayout","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.AbstractNormalizedOPLayout","page":"Home","title":"ClassicalOrthogonalPolynomials.AbstractNormalizedOPLayout","text":"AbstractNormalizedOPLayout\n\nrepresents OPs that are of the form P * R where P is another family of OPs and R is upper-triangular.\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.ShuffledFFT","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.ShuffledFFT","page":"Home","title":"ClassicalOrthogonalPolynomials.ShuffledFFT","text":"Gives a shuffled version of the FFT, with order 1,sin(θ),cos(θ),sin(2θ)…\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.legendre_grammatrix","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.legendre_grammatrix","page":"Home","title":"ClassicalOrthogonalPolynomials.legendre_grammatrix","text":"legendre_grammatrix\n\ncomputes the grammatrix by first re-expanding in Legendre\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.WeightedOPLayout","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.WeightedOPLayout","page":"Home","title":"ClassicalOrthogonalPolynomials.WeightedOPLayout","text":"WeightedOPLayout\n\nrepresents an OP multiplied by its orthogonality weight.\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.interlace!","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.interlace!","page":"Home","title":"ClassicalOrthogonalPolynomials.interlace!","text":"This function implements the algorithm described in:\n\nP. Jain, \"A simple in-place algorithm for in-shuffle,\" arXiv:0805.1598, 2008.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials._tritrunc","category":"page"},{"location":"#ClassicalOrthogonalPolynomials._tritrunc","page":"Home","title":"ClassicalOrthogonalPolynomials._tritrunc","text":"_tritrunc(X,n)\n\ndoes a square truncation of a tridiagonal matrix.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.SetindexInterlace","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.SetindexInterlace","page":"Home","title":"ClassicalOrthogonalPolynomials.SetindexInterlace","text":"SetindexInterlace(z, args...)\n\nis an analogue of Basis for vector that replaces the ith index of z, takes the union of the first axis, and the second axis is a blocked interlace of args.\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.ConvertedOrthogonalPolynomial","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.ConvertedOrthogonalPolynomial","page":"Home","title":"ClassicalOrthogonalPolynomials.ConvertedOrthogonalPolynomial","text":"Represent an Orthogonal polynomial which has a conversion operator from P, that is, Q = P * inv(U).\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"ClassicalOrthogonalPolynomials.PiecewiseInterlace","category":"page"},{"location":"#ClassicalOrthogonalPolynomials.PiecewiseInterlace","page":"Home","title":"ClassicalOrthogonalPolynomials.PiecewiseInterlace","text":"PiecewiseInterlace(args...)\n\nis an analogue of Basis that takes the union of the first axis, and the second axis is a blocked interlace of args. If there is overlap, it uses the first in order.\n\n\n\n\n\n","category":"type"}]
}
