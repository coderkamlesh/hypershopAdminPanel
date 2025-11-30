import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/service/authService';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ShoppingBag, ArrowLeft, Sparkles, Shield, Zap } from 'lucide-react';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await authService.requestOtp(mobile);
      if (response.status === 1) {
        setOtpSent(true);
        setSuccessMessage(response.message || 'OTP sent successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await authService.verifyOtp(mobile, otp);
      if (response.status === 1 && response.data) {
        localStorage.setItem('token', response.data.token);
        setAuth(response.data);

        const role = response.data.role;
        if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
          navigate('/admin/dashboard');
        } else if (role === 'CATALOG_ADMIN') {
          navigate('/catalog/dashboard');
        } else {
          setError('Unauthorized role');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setOtpSent(false);
    setOtp('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djZoLTZ2LTZoNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-primary-foreground">
          <div className="mb-8 bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
            <ShoppingBag className="w-20 h-20" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-5xl font-bold mb-4 text-center">
            HyperShop
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center mb-12 max-w-md">
            Lightning-fast commerce at your fingertips
          </p>

          <div className="grid gap-4 w-full max-w-md">
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="bg-white/20 rounded-lg p-2">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quick Commerce</h3>
                <p className="text-sm text-primary-foreground/80">Deliver products in minutes, not hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="bg-white/20 rounded-lg p-2">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Platform</h3>
                <p className="text-sm text-primary-foreground/80">Enterprise-grade security for your business</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="bg-white/20 rounded-lg p-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Smart Analytics</h3>
                <p className="text-sm text-primary-foreground/80">Real-time insights to grow your business</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="bg-foreground p-3 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-background" />
            </div>
            <h1 className="text-3xl font-bold ml-3 text-foreground">HyperShop</h1>
          </div>

          {/* Login Card */}
          <div className="bg-card rounded-2xl border p-8 shadow-sm">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {otpSent ? 'Verify OTP' : 'Admin Login'}
                </h2>
                <p className="text-muted-foreground">
                  {otpSent 
                    ? 'Enter the 6-digit code sent to your mobile' 
                    : 'Secure access to your admin dashboard'}
                </p>
              </div>

              {/* Messages */}
              {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-xl text-sm font-medium flex items-start gap-3 border border-destructive/20">
                  <span className="text-lg">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-4 bg-primary/10 text-primary rounded-xl text-sm font-medium flex items-start gap-3 border border-primary/20">
                  <span className="text-lg">✓</span>
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form */}
              {!otpSent ? (
                <form onSubmit={handleRequestOtp} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-sm font-semibold text-foreground">
                      Mobile Number
                    </Label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">
                        +91
                      </div>
                      <Input
                        id="mobile"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                        className="h-12 pl-16 text-base font-medium"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Your number is safe and secure with us</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || mobile.length !== 10}
                    className="w-full h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Send OTP
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-semibold text-foreground">
                      Verification Code
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      maxLength={6}
                      className="h-14 text-center text-2xl tracking-[0.5em] font-bold"
                      required
                    />
                    <p className="text-sm text-muted-foreground text-center pt-1">
                      Sent to +91 {mobile}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="w-full h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-5 w-5" />
                          Verify & Login
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="w-full h-11 font-medium"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Change Number
                    </Button>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-sm text-muted-foreground mb-2">Didn't receive the code?</p>
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleRequestOtp}
                      disabled={loading}
                      className="h-auto p-0 font-semibold text-base"
                    >
                      Resend OTP
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Protected by HyperShop Security • v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
